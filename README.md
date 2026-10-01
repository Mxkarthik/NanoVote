HIGH LEVEL OVERVIEW :
                         
                         USER
                          │
                          ▼
                    ONE LOGIN
                          │
                          ▼
                  GLOBAL USER ACCOUNT
                          │
              ┌───────────┴────────────┐
              │                        │
       CREATE ELECTION            JOIN ELECTION
              │                        │
              ▼                        ▼
        ELECTION HEAD          INVITATION / VALIDATOR
              │                        │
              └────────────┬───────────┘
                           ▼
                    ELECTION MEMBERS
                           │
                    Role + Permissions
                           │
        ┌──────────┬───────┼───────┬──────────┐
        ▼          ▼       ▼       ▼          ▼
      HEAD      OFFICER  AUDITOR CANDIDATE   VOTER
        │          │       │        │          │
        └──────────┴───────┴────────┴──────────┘
                           │
                           ▼
                  ELECTION SERVICES
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
         Candidates      Voting        Results
                           │
                           ▼
                       Audit Log
