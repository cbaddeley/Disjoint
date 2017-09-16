
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
