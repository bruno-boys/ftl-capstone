CREATE TABLE users (
    id                  SERIAL PRIMARY KEY,
    first_name          TEXT NOT NULL,
    last_name           TEXT NOT NULL,
    email               TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN EMAIL) > 1),
    password            TEXT NOT NULL,
    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP NOT NULL DEFAULT NOW(), 
    pw_reset_token      TEXT,
    pw_reset_token_exp  TIMESTAMP,
    profile_photo       TEXT
);

CREATE TABLE habits (
    id              SERIAL PRIMARY KEY,
    users_id        INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    habit_name      TEXT NOT NULL,
    frequency       INTEGER NOT NULL,
    period          TEXT NOT NULL,
    start_date      TIMESTAMP NOT NULL DEFAULT NOW(),
    temp_start_date TIMESTAMP DEFAULT NOW(), 
    temp_end_date   TIMESTAMP DEFAULT NOW(),
    end_date        TIMESTAMP
);

CREATE TABLE reminders (
    id              SERIAL PRIMARY KEY, 
    habit_id        INTEGER NOT NULL UNIQUE REFERENCES habits (id) ON DELETE CASCADE ,
    users_id        INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    time            TEXT NOT NULL 
);

CREATE TABLE tracked_habits (
    id              SERIAL PRIMARY KEY,
    habit_id        INTEGER NOT NULL REFERENCES habits (id) ON DELETE CASCADE,
    logged_time     TIMESTAMP NOT NULL DEFAULT NOW(), 
    start_date      TIMESTAMP NOT NULL, 
    end_date        TIMESTAMP NOT NULL
);

CREATE TABLE completed_habits(
    habit_id        INTEGER NOT NULL REFERENCES habits (id) ON DELETE CASCADE,
    completed_count INTEGER NOT NULL
);

CREATE TABLE missed_habits(
    habit_id        INTEGER NOT NULL REFERENCES habits (id) ON DELETE CASCADE,
    missed_count    INTEGER NOT NULL
);

CREATE TABLE habit_progress (
    id              SERIAL PRIMARY KEY,
    habit_id        INTEGER NOT NULL REFERENCES habits (id) ON DELETE CASCADE,
    start_date      TIMESTAMP NOT NULL,
    end_date        TIMESTAMP NOT NULL,
    current_streak  INTEGER NOT NULL DEFAULT 0 
);

CREATE TABLE buddy_request (
    users_id        INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    link            TEXT NOT NULL,
    expires_at      TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '168' HOUR
);


CREATE TABLE buddies (
    user_1          INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    user_2          INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);
