const inquirer = require('inquirer');
const { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, getEmployeesByManager, getEmployeesByDepartment } = require('./queries');

async function mainMenu() {
    const answer = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Departments', 'View Roles', 'View Employees', 'View Employees by Manager', 'View Employees by Department', 'Add Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit'],
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
        case 'View Employees by Manager':
            await promptViewEmployeesByManager();
            break;
        case 'View Employees by Department':
            await promptViewEmployeesByDepartment();
            break;
        case 'Add Department':
            await promptAddDepartment();
            break;
        case 'Add a Role':
            await promptAddRole();
            break;
        case 'Add an Employee':
            await promptAddEmployee();
            break;
        case 'Update an Employee Role':
            await promptUpdateEmployeeRole();
            break;
        case 'Exit':
            process.exit();
    }

    mainMenu();
}

async function promptViewEmployeesByManager() {
    const employees = await getEmployees();
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));

    const answer = await inquirer.prompt({
        name: 'manager_id',
        type: 'list',
        message: 'Select a manager to view their employees:',
        choices: managerChoices,
    });

    const employeesByManager = await getEmployeesByManager(answer.manager_id);
    console.table(employeesByManager);
}

async function promptViewEmployeesByDepartment() {
    const departments = await getDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({ name, value: id }));

    const answer = await inquirer.prompt({
        name: 'department_id',
        type: 'list',
        message: 'Select a department to view its employees:',
        choices: departmentChoices,
    });

    const employeesByDepartment = await getEmployeesByDepartment(answer.department_id);
    console.table(employeesByDepartment);
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

async function promptAddRole() {
    const departments = await getDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({ name, value: id }));

    const answers = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary of the role:',
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Select the department for the role:',
            choices: departmentChoices,
        }
    ]);

    const newRole = await addRole(answers.title, answers.salary, answers.department_id);
    console.log(`Added role: ${newRole.title}`);
}

async function promptAddEmployee() {
    const roles = await getRoles();
    const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));
    const employees = await getEmployees();
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
    managerChoices.unshift({ name: 'None', value: null });

    const answers = await inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the first name of the employee:',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the last name of the employee:',
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'Select the role of the employee:',
            choices: roleChoices,
        },
        {
            name: 'manager_id',
            type: 'list',
            message: 'Select the manager of the employee:',
            choices: managerChoices,
        }
    ]);

    const newEmployee = await addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
    console.log(`Added employee: ${newEmployee.first_name} ${newEmployee.last_name}`);
}

async function promptUpdateEmployeeRole() {
    const employees = await getEmployees();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
    const roles = await getRoles();
    const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));

    const answers = await inquirer.prompt([
        {
            name: 'employee_id',
            type: 'list',
            message: 'Select the employee to update:',
            choices: employeeChoices,
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'Select the new role of the employee:',
            choices: roleChoices,
        }
    ]);

    const updatedEmployee = await updateEmployeeRole(answers.employee_id, answers.role_id);
    console.log(`Updated employee role for: ${updatedEmployee.first_name} ${updatedEmployee.last_name}`);
}

mainMenu();
