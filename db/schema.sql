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

