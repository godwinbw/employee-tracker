INSERT INTO department (name)
VALUES
    ("Sales"),   
    ("Marketing"), 
    ("Product"),
    ("Development"),
    ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES
    ("CEO", 600000.00, 5),
    ("VP Sales", 200000.00, 1),
    ("VP Marketing", 200000.00, 2),
    ("VP Product", 200000.00, 3),
    ("VP Development", 200000.00, 4),


    ("Sales Manager East", 150000.00, 1),
    ("Sales Manager West", 150000.00, 1),
    ("Marketing Manager Work", 150000.00, 2),
    ("Marketing Manager At Home", 150000.00, 2),
    ("Product Manager P1", 150000.00, 3),
    ("Product Manager P2", 150000.00, 3),
    ("Development Manager", 150000.00, 4),
    ("QA Manager", 150000.00, 4),

    ("Salesperson", 100000.00, 1),
    ("Marketing Drone", 100000.00, 2),
    ("Product Drone", 100000.00, 3),
    ("Developer Drone", 100000.00, 4),
    ("QA Drone", 20000.00, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('James','Fraser',1,NULL),
    ('Jack','London',2,1),
    ('Robert','Bruce',3,1),
    ('Peter','Greenaway',4,1),
    ('Derek','Jarman',5,1),
    ('Paolo','Pasolini',6,2),
    ('Heathcote','Williams',7,2),
    ('Sandy','Powell',8,3),
    ('Emil','Zola',9,3),
    ('Sissy','Coalpits',10,4),
    ('Antoinette','Capet',11,4),
    ('Samuel','Delany',12,5),
    ('Tony','Duvert',13,5),
    ('Dennis','Cooper',14,6),
    ('Monica','Bellucci',14,6),
    ('Samuel','Johnson',14,6),
    ('John','Dryden',14,7),
    ('Alexander','Pope',14,7),
    ('Lionel','Johnson',14,7),
    ('Aubrey','Beardsley',15,8),
    ('Tulse','Luper',15,8),
    ('William','Morris',15,8),
    ('George','Shaw',15,9),
    ('Arnold','Bennett',15,9),
    ('Algernon','Blackwood',15,9),
    ('Rhoda','Broughton',16,10),
    ('Hart','Crane',16,10),
    ('Vitorio','DeSica',16,11),
    ('Wilkie','Collins',16,11),
    ('Elizabeth','Gaskell',17,12),
    ('George','Sand',17,12),
    ('Vernon','Lee',17,12),
    ('Arthur','Machen',17,12),
    ('Frederick','Marryat',17,12),
    ('Harriet','Martineau',17,12),
    ('George','Meredith',18,13),
    ('Margaret','Oliphant',18,13),
    ('Anthony','Trollope',18,13),
    ('Charlotte','Yonge',18,13),
    ('Horace','Walpole',18,13),
    ('Matthew','Lewis',18,13);

