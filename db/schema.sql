DROP DATABASE IF EXISTS game_db;
CREATE DATABASE game_db;
USE game_db;

CREATE TABLE Levels
(
id int NOT NULL AUTO_INCREMENT,
level_name varchar(255) NOT NULL,
choices text(500) NOT NULL,
sf_dialog text(21000) NOT NULL,
player_dialog text(21000) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE Enemies
(
id int NOT NULL auto_increment,
enemy_name VARCHAR(250) NOT NULL,
enemy_power int NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE Items
(
id INT NOT NULL auto_increment,
item_name VARCHAR(250) NOT NULL,
item_bonus INT NOT NULL,
PRIMARY KEY(id)
);


USE game_db;

INSERT INTO Levels (level_name, choices, sf_dialog, player_dialog) VALUES ('Level 1', "You decided to grab the item closest to you:@Your pants@A shield left over from a costume@A letter opener", "IT’S GONE! Then demonstrate that you are brave, bold, (and gullible enough) to capture me!@Don’t worry about who I am@JUST GET READY TO GO!", "Resize…commit..and done! Another project link submitted anddddd…..@Who the hell are you and what just happened to my project?!?  My group is going to KILL me!");
-- INSERT INTO Levels (level_name) VALUES ('Level 2', "After thinking for a moment, you decide to…@Punch him and make a run for it @Ask him politely if he could show you how to get out of the forest@Hide and hope he doesn’t see you");
-- INSERT INTO Levels (level_name) VALUES ('Level 3');
-- INSERT INTO Levels (level_name) VALUES ('Level 4', "You stare at the phone…@Pick up phone@Ignore it@Yell loudly into the receiver");
-- INSERT INTO Levels (level_name) VALUES ('Level 5');
-- INSERT INTO Levels (level_name) VALUES ('Level 6');
-- INSERT INTO Levels (level_name) VALUES ('Level 7', "To celebrate waking up from your UX Nightmare you..@Highfive the people around you@Complain about this game on the internet@Decide to give it one more shot");


-- INSERT INTO Shops (item_name, reputation, backpack, secret)
-- VALUES ("Motivation", 10), ("Nightmare book", 5), ("Curly lip hair", 15), ("Solved Folder", 10, false, true);

