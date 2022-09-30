# Employee Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

## Description
The Employee Tracker is a Content Management System that allows for non-developers to be able to view and manipulate data inside of a database. For this app, the user input and interface is captured/displayed through Inquirer.

Node.js, Inquirer, and MySQL are the Javascript libraries used to create this CMS interface. The user has the ability to be able to perform CRUD operations on Employee data (view all, add new, update existing, and delete existing employee), Roles (view all, create new, delete existing role), and Departments (view all, create new, delete existing department).

A [Project Showcase](https://drive.google.com/file/d/1T60MoujaiCD7Wv1l46BskVOhcW0mFbOL/view) is available to see how this application performs.

#### Screenshot
![Screenshot](/public/assets/images/screenshot.png)

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License(s)](#licenses)
4. [Questions](#questions)

## Installation
Clone the repo and open the project. In terminal, execute the command `npm i`. This will install all the dependencies required for this application to work.

## Usage
1. Once the dependancies are installed, the database must be created along with the tables, following by seeding the tables.
2. Log in to MySQL by executing `mysql -u root -p`. After entering your MySQL password, execute the following three codes in order:
```node
source db/db.sql
source db/schema.sql
source db/seeds.sql
```
3. Now exit MySQL by entering `quit`.
4. Establish a connection with the database by renaming `db/connect_EXAMPLE.js` to `db/connection.js`, then enter in your MySQL password and save the file.
5. Finally, begin using the app by starting up Node.js with `node app.js`.

## License(s)
MIT

## Questions
My name is Arslan Tahir, the creator of this project. If you have any issues, comments, concerns, or questions regarding this project, feel free to contact me at tahir.arslan@gmail.com.

If you would like to check out my other projects, feel free to explore my !(GitHub Page)[https://github.com/tahir-arslan/].