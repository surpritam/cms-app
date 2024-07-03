const inquirer = require('inquirer');
const { getDepartments, getRoles, getEmployees, addDepartment } = require('./queries');

async function mainMenu() {
    const answer = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Exit'],
    });

    switch (answer.action) {
        case 'View Departments':
            const departments = await getDepartments();
            console.table(departments);
            break;
        case 'View Roles':
            const roles = await getRoles();
            console.table(roles);
            break;
        case 'View Employees':
            const employees = await getEmployees();
            console.table(employees);
            break;
        case 'Add Department':
            await promptAddDepartment();
            break;
        case 'Exit':
            process.exit();
    }

    mainMenu();
}

async function promptAddDepartment() {
    const answer = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:',
    });
    const newDepartment = await addDepartment(answer.name);
    console.log(`Added department: ${newDepartment.name}`);
}

mainMenu();
