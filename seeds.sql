INSERT INTO department (name) VALUES 
('Sales'), 
('Engineering'), 
('HR');

INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 60000, (SELECT id FROM department WHERE name='Sales')),
('Engineer', 70000, (SELECT id FROM department WHERE name='Engineering')),
('HR Manager', 65000, (SELECT id FROM department WHERE name='HR'));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', (SELECT id FROM role WHERE title='Sales Manager'), NULL),
('Jane', 'Smith', (SELECT id FROM role WHERE title='Engineer'), (SELECT id FROM employee WHERE first_name='John' AND last_name='Doe')),
('Emily', 'Jones', (SELECT id FROM role WHERE title='HR Manager'), NULL);

