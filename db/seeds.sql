INSERT INTO department(name) VALUES 
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
    ("Arthur", "Dent", 1, 2),
    ("Zaphod", "Beelblebrox", 1, NULL),
    ("Trisha", "Mcmillan", 2, 4),
    ("Slarti", "Bartfarst", 2, NULL),
    ("Marvin", "Android", 3, 6),
    ("Fenchurch", "StreetStation", 3, NULL);



