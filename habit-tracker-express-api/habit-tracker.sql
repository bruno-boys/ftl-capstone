\echo 'Delete and recreate habit_tracker database?'
\prompt 'Return for yes or Control + C to cancel > ' answer

DROP DATABASE habit_tracker;
CREATE DATABASE habit_tracker;
\connect habit_tracker;

\i habit-tracker-schema.sql