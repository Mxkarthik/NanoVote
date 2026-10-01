HIGH LEVEL OVERVIEW :
                         
                    USER
                      │
                   LOGIN
                      │
                      ▼
                DEFAULT VOTER
                      │
           ┌──────────┴──────────┐
           │                     │
     CREATE ELECTION         JOIN ELECTION
           │                     │
           ▼                     ▼
     BECOMES OWNER          VALIDATION
                                 │
                       ┌─────────┴─────────┐
                       │                   │
                    VALID               INVALID
                       │                   │
                       ▼                   ▼
                  JOIN AS VOTER         REJECT
                       │
                       ▼
                OWNER MAY PROMOTE
                       │
          ┌────────────┼─────────────┐
          ▼            ▼             ▼
       OFFICER      AUDITOR       CANDIDATE
          │
          ▼
      ELECTION
          │
     NOMINATION
          │
     CANDIDATE APPROVAL
          │
          ▼
       VOTING
          │
   ONE-TIME CREDENTIAL
          │
          ▼
      ANONYMOUS BALLOT
          │
          ▼
       RECEIPT
          │
          ▼
       RESULTS
          │
          ▼
        AUDIT
