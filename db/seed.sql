USE employee_tracker_db;

INSERT into department (name) VALUES ("Owner");
INSERT into department (name) VALUES ("Manager");
INSERT into department (name) VALUES ("Leadership team");
INSERT into department (name) VALUES ("Operational team");

INSERT into role (title, salary, department_id) VALUES ("CEO", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("COO", 90000, 1);
INSERT into role (title, salary, department_id) VALUES ("Finance", 70000, 3);
INSERT into role (title, salary, department_id) VALUES ("Marketing", 60000, 2);
INSERT into role (title, salary, department_id) VALUES ("Technology", 80000, 2);
INSERT into role (title, salary, department_id) VALUES ("Executive assistant", 20000, 4);
INSERT into role (title, salary, department_id) VALUES ("Office manager", 40000, 3);
INSERT into role (title, salary, department_id) VALUES ("Customer service", 30000, 4);
INSERT into role (title, salary, department_id) VALUES ("HR", 50000, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Charles", "Xavier", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Erik Magneto", "Lehnsherr", 2, 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Raven Mystique", "Darkholme", 2, 1, null);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Logan James", "Howlett", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jean", "Grey", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Scott", "Summers", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Peter", "Maximoff", 4, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Victor", "Creed", 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Robert", "Drake", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ororo", "Munroe", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Henry Hank", "McCoy", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kurt", "Wagner", 8, 5);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Marie", "D'Ancanto", 9, null);


-- INSERT INTO rolers
--   (first_name, last_name, email)
-- VALUES
--   ('James', 'Fraser', 'jf@goldenbough.edu'),
--   ('Jack', 'London', 'jlondon@ualaska.edu'),
--   ('Robert', 'Bruce', 'rbruce@scotland.net'),
--   ('Peter', 'Greenaway', 'pgreenaway@postmodern.com'),
--   ('Derek', 'Jarman', 'djarman@prospectcottage.net'),
--   ('Paolo', 'Pasolini', 'ppasolini@salo.com'),
--   ('Heathcote', 'Williams', 'hwilliams@bafta.com'),
--   ('Sandy', 'Powell', 'spowell@oscars.com'),
--   ('Emil', 'Zola', 'ezola@requin.com'),
--   ('Sissy', 'Coalpits', 'scoalpits@greenaway.com'),
--   ('Antoinette', 'Capet', 'acapet@dontloseyourhead.com'),
--   ('Samuel', 'Delany', 'sdelany@dhalgren.com'),
--   ('Tony', 'Duvert', 'tduvert@frenchletters.edu'),
--   ('Dennis', 'Cooper', 'dcooper@georgemiles.com'),
--   ('Monica', 'Bellucci', 'mbell@irreverisble.net'),
--   ('Samuel', 'Johnson', 'sjohnson@boswell.com'),
--   ('John', 'Dryden', 'jdryden@restoration.net'),
--   ('Alexander', 'Pope', 'apope@cambridge.uk.edu'),
--   ('Lionel', 'Johnson', 'ljohnson@darkangel.com'),
--   ('Aubrey', 'Beardsley', 'abeardsely@wilde.net'),
--   ('Tulse', 'Luper', 'tluper@films.net'),
--   ('William', 'Morris', 'wmorris@victoriana.com'),
--   ('George', 'Shaw', 'gshaw@labor.uk'),
--   ('Arnold', 'Bennett', 'abennett@poemsgalore.com'),
--   ('Algernon', 'Blackwood', 'ablack@creepy.net'),
--   ('Rhoda', 'Broughton', 'rb@feminist.com'),
--   ('Hart', 'Crane', 'hcrane@schwesters.de'),
--   ('Vitorio', 'DeSica', 'vdesica@italiano.net'),
--   ('Wilkie', 'Collins', 'wcollins@madmonkton.com'),
--   ('Elizabeth', 'Gaskell', 'egaskell@pages.net'),
--   ('George', 'Sand', 'gsand@pride.com'),
--   ('Vernon', 'Lee', 'vlee@spooks.net'),
--   ('Arthur', 'Machen', 'amach@spirits.com'),
--   ('Frederick', 'Marryat', 'fmarry@boats.net'),
--   ('Harriet', 'Martineau', 'hmartineau@journalism.com'),
--   ('George', 'Meredith', 'gm@egoist.uk'),
--   ('Margaret', 'Oliphant', 'moli@victoriana.com'),
--   ('Anthony', 'Trollope', 'atrollope@barchester.com'),
--   ('Charlotte', 'Yonge', 'cyonge@newday.com'),
--   ('Horace', 'Walpole', 'hwal@otranto.net'),
--   ('Matthew', 'Lewis', 'mlewis@monk.com'),
--   ('William', 'Bedford', 'wbed@grandtour.net'),
--   ('Anne', 'Radcliffe', 'arad@udolpho.uk'),
--   ('Charles', 'Brown', 'cbrown@wieland.us'),
--   ('Eliza', 'Parsons', 'lizzie@fierce.net'),
--   ('Susan', 'Hill', 'shill@womaninblack.net'),
--   ('Sydney', 'Owenson', 'Sowen@think.net'),
--   ('Hubert', 'Crackanthorpe', 'hcrackan@goodletters.com'),
--   ('William', 'Carleton', 'wcarleton@literature.com'),
--   ('Gerald', 'Griffin', 'ggriff@lit.net');

-- INSERT INTO departments
--   (name, description)
-- VALUES
--   ('JS Juggernauts', 'The JS Juggernauts eat, breathe, and sleep JavaScript. They can build everything you could ever want in JS, including a new kitchen sink.'),
--   ('Heroes of HTML', 'Want to see a mock-up turn into an actual webpage in a matter of minutes? Well, the Heroes of HTML can get it done in a matter of seconds.'),
--   ('Git Gurus', 'Need to resolve a merge conflict? The Git Gurus have your back. Nobody knows Git like these folks do.');

-- INSERT INTO employee
--   (first_name, last_name, department_id, role)
-- VALUES
--   ('Ronald', 'Firbank', 1, 1),
--   ('Virginia', 'Woolf', 1, 1),
--   ('Piers', 'Gaveston', 1, 0),
--   ('Charles', 'LeRoi', 2, 1),
--   ('Katherine', 'Mansfield', 2, 1),
--   ('Dora', 'Carrington', 3, 0),
--   ('Edward', 'Bellamy', 3, 0),
--   ('Montague', 'Summers', 3, 1),
--   ('Octavia', 'Butler', 3, 1),
--   ('Unica', 'Zurn', NULL, 1);
  