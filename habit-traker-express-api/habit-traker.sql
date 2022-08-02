\echo 'Delete and recreate habit_tracker database?'
\prompt 'Return for yes or Control + C to cancel > ' answer

DROP DATABASE habit_traker;
CREATE DATABASE habit_traker;
\connect habit_traker;

\i habit-traker-schema.sql