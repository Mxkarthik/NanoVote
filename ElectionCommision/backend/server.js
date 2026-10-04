const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { once } = require("node:events");

const electionRoutes = require("./routes/electionRoutes");
const healthRoutes = require("./routes/healthRoutes");
const { pool, testDatabaseConnection } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
let server;
let shutdownPromise;
let shuttingDown = false;

app.use(cors());
app.use(express.json());

app.use("/elections", electionRoutes);
app.use("/health", healthRoutes);
app.use("/elections", electionRoutes);

app.get("/", (req, res) => {
    res.send("VoteSphere Election Commision API is Running");
});

const shutdown = () => {
    if (shutdownPromise) {
        return shutdownPromise;
    }

    shuttingDown = true;
    shutdownPromise = (async () => {
        if (server && server.listening) {
            await new Promise((resolve, reject) => {
                server.close((error) => error ? reject(error) : resolve());
            });
        }

        await pool.end();
    })().catch(() => {
        process.exitCode = 1;
    });

    return shutdownPromise;
};

process.on("SIGINT", () => {
    console.log("[INFO] Shutdown requested (SIGINT).");
    void shutdown();
});

process.on("SIGTERM", () => {
    console.log("[INFO] Shutdown requested (SIGTERM).");
    void shutdown();
});

const startServer = async () => {
    console.log("========================================");
    console.log("          VOTESPHERE BACKEND");
    console.log("========================================");
    console.log("\n[INFO] Initializing backend...");
    console.log("[INFO] Connecting to Supabase PostgreSQL...\n");

    try {
        await testDatabaseConnection();
    } catch {
        console.error("[ERROR] PostgreSQL connection failed.");
        console.error("[INFO] Verify database availability and credentials.");
        console.error("[INFO] Server startup aborted.\n");
        console.log("========================================");
        process.exitCode = 1;
        await shutdown();
        return;
    }

    if (shuttingDown) {
        return;
    }

    console.log("[SUCCESS] PostgreSQL connection verified.");
    console.log("[SUCCESS] Database query executed successfully.");

    try {
        server = app.listen(PORT);
        await once(server, "listening");
    } catch {
        console.error("[ERROR] Express server failed to start.");
        console.error("[INFO] Server startup aborted.\n");
        console.log("========================================");
        process.exitCode = 1;
        await shutdown();
        return;
    }

    if (shuttingDown) {
        return;
    }

    console.log("[SUCCESS] Express server started.");
    console.log(`\n[INFO] API: http://localhost:${PORT}`);
    console.log("\n========================================");
};

void startServer();