DROP DATABASE IF EXISTS pizza_db;
CREATE DATABASE pizza_db;
USE pizza_db;

CREATE TABLE pizza (
	id integer auto_increment not null,
	name varchar(255) not null,
	devoured boolean default false,
	date timestamp default CURRENT_TIMESTAMP,
	primary key(id)
);