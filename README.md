High Level Architecture :   
                         USER
                           │
                           ▼
                     SELECT PORTAL
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
       ELECTION COMMISSION        VOTER PORTAL
                │                     │
                ▼                     ▼
        OFFICIAL LOGIN       EMPLOYEE ID + ( Facial Hash )
                │                     │
                ▼                     │
       ELECTION MANAGEMENT            │
                │                     │
       ┌────────┴─────────┐           │
       │                  │           │
       ▼                  ▼           │
 CREATE ELECTION    SELECT ASSOCIATIONS
       │                  │           │
       └────────┬─────────┘           │
                ▼                     │
       ADD ELIGIBLE EMPLOYEES         │
       (EMPLOYEE RECORDS)             │
                │                     │
                ▼                     │
         PUBLISH ELECTION             │
                │                     │
                └──────────┬──────────┘
                           ▼
                  EMPLOYEE VERIFICATION
                           │
                           ▼
                 ELECTION ELIGIBILITY
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
               INELIGIBLE      ELIGIBLE
                    │             │
                    ▼             ▼
               ACCESS DENIED  FACE VERIFICATION
                                  │
                           ┌──────┴──────┐
                           │             │
                           ▼             ▼
                       FAILED       SUCCESSFUL
                           │             │
                           ▼             ▼
                  ALTERNATE CHECK  VOTER DASHBOARD
                                         │
                            ┌────────────┼────────────┐
                            │            │            │
                            ▼            ▼            ▼
                       VIEW ELECTION  NOMINATION    VOTING
                            │            │            │
                            │            ▼            │
                            │       SUBMIT NOMINATION │
                            │            │            │
                            │            ▼            │
                            │     OFFICIAL SCRUTINY   │
                            │            │            │
                            │            ▼            │
                            │    ACCEPT / REJECT      │
                            │                         │
                            └────────────┬────────────┘
                                         ▼
                                ELECTION SERVICES
                                         │
                            ┌────────────┼────────────┐
                            │            │            │
                            ▼            ▼            ▼
                       CANDIDATES     BALLOT       RESULTS
                                         │
                                         ▼
                                   VOTE RECORD
                                         │
                                         ▼
                                    AUDIT LOG
