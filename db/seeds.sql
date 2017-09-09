USE game_db;

INSERT INTO Levels (level_name, choices, sf_dialog, player_dialog) VALUES ('Level 1', "You decided to grab the item closest to you:@Your pants@A shield left over from a costume@A letter opener", "IT’S GONE!   If you want your precious project back, then demonstrate that you are brave, bold, (and potentially gullible enough) to follow me through this portal…what are you waiting for?  Embrace your--!@Don’t worry about who I am, the greater question now is who do you WANT to b—@JUST GET READY TO GO—You have treasure to collect!", "Resize…commit..and done! Another project link submitted anddddd…..@Who the hell are you and what just happened to my project?!?  My group is going to KILL me!@YOU JUST KILLED MY PROJECT, YOU DON’T UNDERSTAND, THESE PEOPLE ARE SERIOUS@Excellent!  Let’s Goooooooo~!");
INSERT INTO Levels (level_name) VALUES ('Level 2');
INSERT INTO Levels (level_name) VALUES ('Level 3');
INSERT INTO Levels (level_name) VALUES ('Level 4');
INSERT INTO Levels (level_name) VALUES ('Level 5');
INSERT INTO Levels (level_name) VALUES ('Level 6');
INSERT INTO Levels (level_name) VALUES ('Level 7');
INSERT INTO Levels (level_name) VALUES ('Level 8');
INSERT INTO Levels (level_name) VALUES ('Level 9');
INSERT INTO Levels (level_name) VALUES ('Level 10');

INSERT INTO Shops (item_name, reputation, backpack, secret)
VALUES ("Motivation", 10), ("Nightmare book", 5), ("Curly lip hair", 15), ("Solved Folder", 10, false, true);
 