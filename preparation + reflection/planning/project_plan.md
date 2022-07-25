# Project Plan

Pod Members: **Aloye Oshotse, Yaw Kessey, Abdul Rauf**

## Problem Statement and Description

Many people desire to form healthy and persistent habits and stop their bad habits; however, we all get caught up with everyday life and fail to keep track of the habits we wish to implement or remove in our lives.

The main purpose of our project is to provide an efficient and innovative way to help users stay consistent with their desired habits, stop their less desirable habits, and track their progress along the way. Our project will provide key features: preset habits and options to add/modify your own, reminders for each of their habits based on user settings, and a user page for achievements and progress tracking. We believe that our target audience will use our site in a periodic cycle (depending on how they set their habits, i.e., daily, weekly, monthly). In this cycle, they will check off the habits they complete and receive reminders (via notification, SMS, or email) to complete the habit if they have not done so already.


## User Roles and Personas

user —> has the basic features in the app
“a user who is seeking to keep track of habits”

- Abdul is a student at Amherst College. Abdul has trouble sleeping early. He generally finds himself overwhelmed with the course load for each class and his assignments tend to pile up due to procrastination. He wants to create healthy habits that will prevent his stress and get rid of bad habits that cause the stress..

- Alexander is a University senior studying computer living in a suburb of Houston, Texas. He recently found that he is addicted to weed and has since lost all healthy family relations. He knows he needs his family and friends back. Alexander never really cared about his health and lungs so he never limited the amount of weed use. Now with the help of the app, he could set goals and limits for himself and be able to control his substance abuse.

## User Stories

1. As a user, I want links in the Navbar that allow me to quickly navigate the application.
    1. Links on Navbar when logged in: 
        1. logo —> activity page
        2. activity page
        3. habits page
        4. users profile
        5. sign out
    2. Links on Navbar when logged out: 
        1. Sign Up 
        2. Sign In
        3. Logo —> Landing/Home Page
2. As a user, I want to be able to ***register*** to create and save my user information
    1. auth/register —> users data table
    2. Required Credentials: first name, last name, username, email, password, phone number 
    3. Link to login if they have an account
3. As a user, I want to be able to and ***login*** and access my user information.
    1. auth/login —> users data table
    2. Required Credentials: username/email and password 
    3. Link to Sign Up if no account created 
4. As a user, I want to be able to view all of my habit statistics on my activity page
    1. runs statistics on all of the habits for the user
5. As a user, I want to be able to view my user information
6. As a user, I want to be able to modify my user information (i.e, change username —> may cause trouble if other tables reference this, user/reminder preferences, name)
7. As a user, i want to be able to delete my account when i do not like the app any longer. my user information (i.e, password, location, preferences, etc.)
    1. how deep do we want to go into this?
    2. (which columns in the database tables are directly related to the MVP)
8. As a user, I want to be able to create my own habits.
9. As a user, I want to be able to modify my previously created habits.
10. As a user, I want to be able to see a list of all of my habits.
11. As a user, I want to be able to delete habits (or even delete them all at once)
12. As a user, I want to be able to access one distinct habit and very all the information about it.
13. As a user, I want to be able to log my activities for a specific habit

## Pages/Screens

https://www.figma.com/file/HYFxKJDL4sryMDqsLx1xp7/Habit-Tracker?node-id=0%3A1

**List of Pages:**

- Landing Page
- Register Page
- Login Page
- Activity Page
- Habits Page
- User Page
- Habit Detail Page
- Habit Form Page

## Data Model

**users table**

<img width="530" alt="Screen Shot 2022-07-22 at 2 23 06 PM" src="https://user-images.githubusercontent.com/96442350/180570491-3eebd7a8-1ddf-405e-b7ba-17aadd1eb089.png">

**habits table**

<img width="628" alt="Screen Shot 2022-07-22 at 2 25 24 PM" src="https://user-images.githubusercontent.com/96442350/180570731-9b01a8f1-74fd-40a5-8e0c-5473816d2ef3.png">

**tracked_habits table**

<img width="798" alt="Screen Shot 2022-07-22 at 2 27 14 PM" src="https://user-images.githubusercontent.com/96442350/180570899-8fe7c422-1e65-4d34-9f3c-912402dae54b.png">

## Endpoints

<img width="807" alt="Screen Shot 2022-07-22 at 2 19 24 PM" src="https://user-images.githubusercontent.com/96442350/180570071-9b31a62f-8ffa-46da-951c-b222de78d34b.png">

