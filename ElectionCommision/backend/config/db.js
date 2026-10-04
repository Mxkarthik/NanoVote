const { Pool } = require("pg");
const fs = require("node:fs");
const path = require("node:path");

let sslCa;
let sslConfigurationError = false;

const sanitizeDiagnosticValue = (value) => String(value)
    .replace(/\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^\s"'<>]+/gi, "[REDACTED_CONNECTION_STRING]")
    .replace(/\b(password|passwd|token|secret|access[_-]?key|api[_-]?key|authorization)\s*[:=]\s*[^\s,;]+/gi, "$1=[REDACTED]");

const classifyPostgreSqlError = (error) => {
    const code = String(error?.code || "");
    const message = String(error?.message || "");

    if (["ENOTFOUND", "EAI_AGAIN", "ENODATA"].includes(code)) return "DNS";
    if (["ECONNREFUSED", "ECONNRESET", "ETIMEDOUT", "EHOSTUNREACH", "ENETUNREACH", "EPIPE"].includes(code)) return "network";
    if (/TLS|SSL|CERTIFICATE/i.test(code) || /certificate|TLS|SSL/i.test(message)) return "TLS";
    if (["28P01", "28000"].includes(code) || /password authentication failed/i.test(message)) return "PostgreSQL authentication";
    return "PostgreSQL";
};

const logPostgreSqlError = (error) => {
    const diagnostics = {
        category: classifyPostgreSqlError(error),
        message: sanitizeDiagnosticValue(error?.message || error || "Unknown database error")
    };

    for (const field of ["code", "severity", "syscall", "hostname", "port"]) {
        if (error?.[field] !== undefined && error[field] !== null) {
            diagnostics[field] = sanitizeDiagnosticValue(error[field]);
        }
    }

    console.error("[ERROR] PostgreSQL diagnostic:", JSON.stringify(diagnostics));
};

if (process.env.DATABASE_SSL_CA_PATH) {
    try {
        sslCa = fs.readFileSync(path.resolve(process.env.DATABASE_SSL_CA_PATH), "utf8");
    } catch {
        sslConfigurationError = true;
    }
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    query_timeout: 10000,
    ssl: {
        rejectUnauthorized: true,
        ...(sslCa ? { ca: sslCa } : {})
    }
});

pool.on("error", (error) => {
    console.error("[ERROR] Unexpected PostgreSQL pool error.");
    logPostgreSqlError(error);
});

const testDatabaseConnection = async () => {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not configured.");
    }
    if (sslConfigurationError) {
        throw new Error("Configured database CA certificate could not be loaded.");
    }

    let client;

    try {
        client = await pool.connect();
        await client.query("SELECT 1;");
        return { success: true };
    } catch (error) {
        logPostgreSqlError(error);
        throw new Error("Database connection verification failed.");
    } finally {
        if (client) {
            client.release();
        }
    }
};

module.exports = { pool, testDatabaseConnection };