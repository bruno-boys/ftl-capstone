CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN EMAIL) > 1),
    username        TEXT NOT NULL UNIQUE,
    phone_number    TEXT NOT NULL UNIQUE,
    password        TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE habits (
    id              SERIAL PRIMARY KEY,
    users_id        INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    habit_name      TEXT NOT NULL,
    frequency       INTEGER NOT NULL,
    period          TEXT NOT NULL,
    start_date      TIMESTAMP NOT NULL DEFAULT NOW(),
    end_date        TIMESTAMP
);

CREATE TABLE tracked_habits (
    id              SERIAL PRIMARY KEY,
    habit_id        INTEGER NOT NULL REFERENCES habits (id) ON DELETE CASCADE,
    completed_count INTEGER NOT NULL,
    completed       BOOLEAN NOT NULL,
    start_of_period TIMESTAMP NOT NULL DEFAULT NOW(),
    end_of_period   TIMESTAMP NOT NULL
);