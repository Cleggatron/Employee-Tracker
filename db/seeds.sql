INSERt INTO department(name) VALUES 
    ("Sales"),
    ("Marketing"),
    ("IT");

INSERT INTO role (title, salary, department_id) VALUES
    ("Sales Associate", 20000, 1),
    ("Sales Manager", 30000, 1),
    ("Marketing Associate", 20000, 2),
    ("Marketing Manager", 30000, 2),
    ("IT Technician", 20000, 3),
    ("IT Manager", 30000, 3);
    

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("John", "Smith", 1, 2),
    ("Johannes", "Smyth", 1, NULL),
    ("Jane", "Smith", 2, 4),
    ("Janet", "Smyth", 2, NULL),
    ("James", "Smith", 3, 6),
    ("Jemima", "Smyth", 3, NULL);



