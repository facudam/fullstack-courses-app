CREATE DATABASE courses_db;

USE courses_db;

CREATE TABLE technologies(
	tech_id INT NOT NULL AUTO_INCREMENT,
	tech_name VARCHAR(25),
	PRIMARY KEY(tech_id)
);

CREATE TABLE authors(
	author_id INT NOT NULL AUTO_INCREMENT,
	author_name VARCHAR(30),
	author_country VARCHAR(30),
	PRIMARY KEY (author_id)
);

CREATE TABLE course_languages(
	language_id INT NOT NULL AUTO_INCREMENT,
	language_name VARCHAR(100),
	PRIMARY KEY(language_id)
);

CREATE TABLE course_types(
	type_id INT NOT NULL AUTO_INCREMENT,
	type_name VARCHAR(50),
	PRIMARY KEY(type_id)
);

CREATE TABLE users (
	user_id INT AUTO_INCREMENT,
	user_name VARCHAR(50),
	user_email VARCHAR(60) UNIQUE,
	user_password VARCHAR(250),
	is_confirmed BOOLEAN DEFAULT 0,
	PRIMARY KEY (user_id)
);

CREATE TABLE courses (
	course_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	is_free BOOLEAN NOT NULL,
	resource_link VARCHAR(250) NOT NULL,
	description VARCHAR(600) NOT NULL,
	image VARCHAR(250) NOT NULL,
	with_certification BOOLEAN DEFAULT 0,
	language_id INT NOT NULL,
	type_id INT NOT NULL,
	tech_id INT NOT NULL,
	author_id INT NOT NULL,
	user_id INT NOT NULL,
	PRIMARY KEY(course_id),
	CONSTRAINT fk_language_id FOREIGN KEY(language_id)
	REFERENCES course_languages(language_id) ON DELETE CASCADE,
	CONSTRAINT fk_type_id FOREIGN KEY(type_id)
	REFERENCES course_types(type_id) ON DELETE CASCADE,
	CONSTRAINT fk_tech_id FOREIGN KEY(tech_id)
	REFERENCES technologies(tech_id) ON DELETE CASCADE,
	CONSTRAINT fk_author_id FOREIGN KEY(author_id)
	REFERENCES authors(author_id) ON DELETE CASCADE,
	CONSTRAINT fk_user_id FOREIGN KEY(user_id)
	REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE star_rating_per_courses(
	rate_id INT NOT NULL AUTO_INCREMENT,
	rate INT,
	course_id INT,
	user_id INT,
	PRIMARY KEY(rate_id),
	CONSTRAINT fk_course_id FOREIGN KEY(course_id)
	REFERENCES courses(course_id),
	CONSTRAINT fk_user_id_rating FOREIGN KEY (user_id)
	REFERENCES users(user_id)
);

CREATE TABLE comments (
    comment_id INT NOT NULL AUTO_INCREMENT,
    comment_description VARCHAR(200),
    course_id INT,
    user_id INT,
    PRIMARY KEY(comment_id),
    CONSTRAINT fk_comments_course_id FOREIGN KEY(course_id)
    REFERENCES courses(course_id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_user_id FOREIGN KEY(user_id)
    REFERENCES users(user_id) ON DELETE CASCADE
);


