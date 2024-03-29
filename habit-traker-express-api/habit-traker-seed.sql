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
VALUES 
(1, 'Aloye - Drink Water', 1, 'Per Day', '2022-08-13 00:00:00', '2022-08-16 00:00:00', '2022-08-17 00:00:00', '2022-08-31 00:00:00'),
(1, 'Aloye - Meditate', 1, 'Per Day', '2022-08-12 00:00:00', '2022-08-16 00:00:00', '2022-08-17 00:00:00', '2022-08-31 00:00:00'),
(1, 'Aloye - Run a Mile', 1, 'Per Week', '2022-08-01 00:00:00', '2022-08-15 00:00:00', '2022-08-22 00:00:00', '2022-11-08 00:00:00'),

(2, 'Yaw - Exercise', 1, 'Per Day', '2022-08-13 00:00:00', '2022-08-16 00:00:00', '2022-08-17 00:00:00', '2022-11-08 00:00:00'),
(2, 'Yaw - Music Practice', 1, 'Per Day', '2022-08-12 00:00:00', '2022-08-16 00:00:00', '2022-08-17 00:00:00', '2022-08-31 00:00:00'),
(2, 'Yaw - Pay Credit Card Bill', 1, 'Per Day', '2022-08-13 00:00:00', '2022-08-16 00:00:00', '2022-08-17 00:00:00', '2023-09-01 00:00:00'),

(3, 'Abdul - Get 8hrs of Sleep', 1, 'Per Day', '2022-08-14 00:00:00', '2022-08-16 00:00:00', '2022-08-17 00:00:00', '2022-08-31 00:00:00'),
(3, 'Abdul - Read Poetry', 2, 'Per Week', '2022-08-01 00:00:00', '2022-08-15 00:00:00', '2022-08-22 00:00:00', '2022-08-31 00:00:00'),
(3, 'Abdul - Do Laundry', 1, 'Per Month', '2022-06-01 00:00:00', '2022-08-01 00:00:00', '2022-09-01 00:00:00', '2023-11-17 00:00:00');



INSERT INTO tracked_habits (habit_id, logged_time, start_date, end_date)
VALUES 
-- Aloye
(1, '2022-08-13 12:21:19.104164', '2022-08-13 00:00:00', '2022-08-14 00:00:00'),
(1, '2022-08-16 13:21:19.104164', '2022-08-16 00:00:00', '2022-08-17 00:00:00'),

(2, '2022-08-16 12:00:00.00', '2022-08-16 00:00:00', '2022-08-17 00:00:00'),

(3, '2022-08-01 12:21:19.104164', '2022-08-01 00:00:00', '2022-08-08 00:00:00'),
(3, '2022-08-08 12:21:19.104164', '2022-08-08 00:00:00', '2022-08-15 00:00:00'),
(3, '2022-08-15 12:21:19.104164', '2022-08-15 00:00:00', '2022-08-22 00:00:00'),

-- Yaw
(4, '2022-08-13 12:21:19.104164', '2022-08-13 00:00:00', '2022-08-14 00:00:00'),
(4, '2022-08-14 12:21:19.104164', '2022-08-14 00:00:00', '2022-08-15 00:00:00'),
(4, '2022-08-16 13:21:19.104164', '2022-08-16 00:00:00', '2022-08-17 00:00:00'),

(5, '2022-08-15 12:21:19.104164', '2022-08-15 00:00:00', '2022-08-16 00:00:00'),
(5, '2022-08-16 13:21:19.104164', '2022-08-16 00:00:00', '2022-08-17 00:00:00'),

(6, '2022-08-16 13:21:19.104164', '2022-08-16 00:00:00', '2022-08-17 00:00:00'),


-- Abdul
(7, '2022-08-14 12:21:19.104164', '2022-08-14 00:00:00', '2022-08-15 00:00:00'),
(7, '2022-08-15 12:21:19.104164', '2022-08-15 00:00:00', '2022-08-16 00:00:00'),
(7, '2022-08-16 12:21:19.104164', '2022-08-16 00:00:00', '2022-08-17 00:00:00'),
(7, '2022-08-17 12:21:19.104164', '2022-08-17 00:00:00', '2022-08-18 00:00:00'),

(8, '2022-08-01 12:21:19.104164', '2022-08-01 00:00:00', '2022-08-08 00:00:00'),
(8, '2022-08-01 12:21:19.104164', '2022-08-01 00:00:00', '2022-08-08 00:00:00'),
(8, '2022-08-08 12:21:19.104164', '2022-08-08 00:00:00', '2022-08-15 00:00:00'),
(8, '2022-08-08 12:21:19.104164', '2022-08-08 00:00:00', '2022-08-15 00:00:00'),
(8, '2022-08-15 12:21:19.104164', '2022-08-15 00:00:00', '2022-08-22 00:00:00'),

(9, '2022-06-01 12:21:19.104164', '2022-06-01 00:00:00', '2022-07-01 00:00:00'),
(9, '2022-07-01 12:21:19.104164', '2022-07-01 00:00:00', '2022-08-01 00:00:00'),
(9, '2022-08-01 12:21:19.104164', '2022-08-01 00:00:00', '2022-09-01 00:00:00');


INSERT INTO completed_habits (habit_id, completed_count)
VALUES 
(1, 2),
(2, 1),
(3, 2),
(4, 3),
(5, 2),
(6, 1),
(7, 3),
(8, 2),
(9, 2);


INSERT INTO missed_habits (habit_id, missed_count)
VALUES 
(1, 2),
(2, 4),
(3, 0),
(4, 1),
(5, 3),
(6, 3),
(7, 0),
(8, 0),
(9, 0);



INSERT INTO habit_progress (habit_id, start_date, end_date, current_streak)
VALUES 
(1, '2022-08-16 00:00:00', '2022-08-17 00:00:00', 1),
(2, '2022-08-16 00:00:00', '2022-08-17 00:00:00', 1),
(3, '2022-08-08 00:00:00', '2022-08-15 00:00:00', 2),
(4, '2022-08-16 00:00:00', '2022-08-17 00:00:00', 1),
(5, '2022-08-16 00:00:00', '2022-08-17 00:00:00', 2),
(6, '2022-08-16 00:00:00', '2023-08-17 00:00:00', 1),
(7, '2022-08-16 00:00:00', '2022-08-17 00:00:00', 3),
(8, '2022-08-08 00:00:00', '2022-08-15 00:00:00', 2),
(9, '2022-07-01 00:00:00', '2022-08-01 00:00:00', 2);


INSERT INTO buddies (user_1, user_2)
VALUES 
(1,2),
(2,1),
(1,3),
(3,1),
(2,3),
(3,2);