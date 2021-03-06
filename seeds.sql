USE business_db;
-- Insert multiple biographies --
INSERT INTO department (name)
VALUES
    ("Accounting" ),
    ("Sales" ),
    ("Quality Assurance" ),
    ("Human Resources" ),
    ("Customer Service" );
    

INSERT INTO role (title, salary, department_id )
VALUES
    ("Engineer", 80000, 3 ),
    ("HR Rep", 85000, 4),
    ("Accountant", 70000, 1 ),
    ("Customer Service Rep", 50000, 5 ),
    ("Sales Rep", 65000, 2),
    ("Manager", 80000, 2);

-- HOW DO I GET VALUES INTO THE TABLE?
INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES
    ("Angela","Martin", 3, 6),
    ("Jim","Halpert", 5, 1),
    ("Creed","Bratton", 1, NULL),
    ("Toby","Flenderson", 2, 6),
    ("Kelly","Kapoor", 4, 6),
    ("Michael","Scott", 6, NULL);

