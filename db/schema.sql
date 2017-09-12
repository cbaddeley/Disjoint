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

INSERT INTO Levels (level_name, choices, sf_dialog, player_dialog) VALUES ('Level 1', "You decided to grab the item closest to you:@Your pants@A shield left over from a costume@A letter opener", "Villian: IT’S GONE! If you want it back, demonstrate that you are brave, bold, (and gullible enough) to capture me!@ Don’t worry about who I am@ JUST GET READY TO GO!", "Resize…commit..and done! Another project link submitted anddddd…..@Who the hell are you and what just happened to my project?!?@ My group is going to KILL me!");
INSERT INTO Levels (level_name, choices, sf_dialog, player_dialog) VALUES ('Level 2', "After calming down and thinking for a moment, you decide to:@Punch him and run from the swarm @Hide and hope he doesn’t see you @Confront each bug bit by bit", "Villian:  Ha! Behold my new form.  Now I have you in my web, let's see you get out of this one!@ That's right, how will you beat my bug army!@There are too many, can't you feel their overwhelming power?!?", "Ugh, I don’t feel so great…Where am I? What is with this forest? GAH is that a spider?@ What should I do…?@SO MANY BUGS, WHERE DO I START?");
-- INSERT INTO Levels (level_name) VALUES ('Level 3');
INSERT INTO Levels (level_name, choices, sf_dialog, player_dialog) VALUES ('Level 4', "You hear the ring of a phantomphone and decide to...@stare into the firey abyss @Pick it up @Ignore it@Yell loudly into the receiver 'NO MORE CALLBACKS'", "Villian: You are pretty clever.Let's see if this next stage rings a bell.@ If you can't get past this stage, how will you find your true calling? Will you stay in callback hell?@ Let's hope your group will still give you warm reception! HAHAHA", "It is sooo hot in here...Are...are you dressed like a cellphone?@ I know I can do this! Your evil design techniques will have no effect on me!@No sweat! I can handle the heat!");
-- INSERT INTO Levels (level_name) VALUES ('Level 5');
-- INSERT INTO Levels (level_name) VALUES ('Level 6');
INSERT INTO Levels (level_name, choices, sf_dialog, player_dialog) VALUES ('Level 7', "To celebrate waking up from your UX Nightmare you...@Highfive the people around you@Complain about this game on the internet@Decide to give it one more shot", "Villian: Well done, you have confronted the worst of your fears and THIS is the last time we will meet. All you have to do is--@IF YOU WOULD LET ME FINISH…I was going to say hang out over here so I could congratulate you.  You really have no sense of gratitude… anyway,  good job.  Oh yeah, you get a free shirt too @Your project is safe, now go and tell others what you have seen here", "Alright you.  I have followed you through too many of these portals.  Enough already!  Fix my project and let me go home.  I don’t even want to know how much time off this adventure has cost me@Hand over all this awesome loot?  NO way! I won these fair and square, you didn’t even offer any help, only a bunch of ridiculous puns—@Thanks? Could I at least get a ride home?");


-- INSERT INTO Shops (item_name, reputation, backpack, secret)
-- VALUES ("Motivation", 10), ("Nightmare book", 5), ("Curly lip hair", 15), ("Solved Folder", 10, false, true);

