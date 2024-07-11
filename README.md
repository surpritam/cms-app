# Module 12 Challenge

# Employee Management CLI

This is a command-line application to manage departments, roles, and employees within an organization. It allows users to view and manage data interactively via the command line.

## Features

- View Departments
- View Roles
- View Employees
- View Employees by Manager
- View Employees by Department
- Add a department
- Add a role
- Add an employee
- Update an employee role

## Table of Contents

- [Module 12 Challenge](#module-12-challenge)
- [Employee Management CLI](#employee-management-cli)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)

## Installation

1. Clone the repository and navigate to project directory:
   ```sh
   cd cms-app
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Create the database schema and seed the initial data:
   ```sh
   node setup.js
   ```
   (Note: Ensure database connection details is correct in `db.js`)

## Usage

   1. Start the application
      ```sh
      node setup.js
      ```
   2. Follow the prompts to manage your departments, roles, and employees.
      Here's a [demo](https://drive.google.com/file/d/1DkBlh8gylvqfPnyjgu2qQC6BKU_ye8xB/view?usp=drive_link) on how to use this application

## Technologies Used

   * Node.js
   * PostgreSQL
   * pg (node-postgres) package
   * Inquirer package