-- SEED File
-- Create mock users
-- Create mock habits

INSERT INTO users (first_name, last_name, email, password)
VALUES (
  'Aloye',
  'Oshotse',
  'ajo@gmail.com',
  '$2b$10$FLJA3/1SHLvm60G434l9O.c.gS2agHnmHmb.0Zh3fbOpi4oc5S796'
), (
  'Yaw',
  'Kessey',
  'yk@gmail.com',
  '$2b$10$7wicsTtD3ZmiVfiyvTgOXu.Mz/565mQTs4Xs8I.vHXAQCIfTaU0Ti'
), (
  'Abdul',
  'Rauf',
  'ar@gmail.com',
  '$2b$10$mkaQdh1IRrHwMlYhuCFLXepvWhp0woPT5.VmGU9goQc86Xy4.Lcum' 
);


INSERT INTO habits (users_id, habit_name, frequency, period, start_date, temp_start_date, temp_end_date, end_date)
VALUES (

)


INSERT INTO tracked_habits (habit_id, logged_time, start_date, end_date)
VALUES (

)


INSERT INTO completed_habits (habit_id, completed_count)
VALUES (

)


INSERT INTO missed_habits (habit_id, missed_count)
VALUES (

)


INSERT INTO habit_progress (habit_id, start_date, end_date, current_streak)
VALUES (

)


INSERT INTO buddies (user_1, user_2)
VALUES (

)