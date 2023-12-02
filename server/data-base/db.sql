CREATE DATABASE courses_db;

USE courses_db;

CREATE TABLE technology(
	tech_id INT NOT NULL AUTO_INCREMENT,
	tech_name VARCHAR(100),
	PRIMARY KEY(tech_id)
);

CREATE TABLE author(
	author_id INT NOT NULL AUTO_INCREMENT,
	author_name VARCHAR(100),
	author_country VARCHAR(100),
	PRIMARY KEY (author_id)
);

CREATE TABLE course_language(
	language_id INT NOT NULL AUTO_INCREMENT,
	language_name VARCHAR(100),
	PRIMARY KEY(language_id)
);

CREATE TABLE course_type(
	type_id INT NOT NULL AUTO_INCREMENT,
	type_name VARCHAR(100),
	PRIMARY KEY(type_id)
);

CREATE TABLE course (
	course_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	is_free BOOLEAN NOT NULL,
	resource_link VARCHAR(1000) NOT NULL,
	description VARCHAR(250) NOT NULL,
	image VARCHAR(250) NOT NULL,
	language_id INT NOT NULL,
	type_id INT NOT NULL,
	tech_id INT NOT NULL,
	PRIMARY KEY(course_id),
	CONSTRAINT fk_language_id FOREIGN KEY(language_id)
	REFERENCES course_language(language_id),
	CONSTRAINT fk_type_id FOREIGN KEY(type_id)
	REFERENCES course_type(type_id),
	CONSTRAINT fk_tech_id FOREIGN KEY(tech_id)
	REFERENCES technology(tech_id)
);

CREATE TABLE star_rating_per_course(
	rate_id INT NOT NULL AUTO_INCREMENT,
	rate INT,
	course_id INT,
	user_id INT,
	PRIMARY KEY(rate_id),
	CONSTRAINT fk_course_id FOREIGN KEY(course_id)
	REFERENCES course(course_id),
	CONSTRAINT fk_user_id_rating FOREIGN KEY (user_id)
	REFERENCES user(user_id)
);

CREATE TABLE comments(
	comment_id INT NOT NULL AUTO_INCREMENT,
	comment_description VARCHAR(100),
	course_id INT,
	user_id INT,
	PRIMARY KEY(comment_id),
	CONSTRAINT fk_comments_course_id FOREIGN KEY(course_id)
	REFERENCES course(course_id),
	CONSTRAINT fk_comments_user_id FOREIGN KEY(user_id)
	REFERENCES user(user_id)
);

CREATE TABLE creado_por (
    author_id INT,
    course_id INT,
    PRIMARY KEY (author_id, course_id),
    CONSTRAINT fk_creado_por_author_id FOREIGN KEY (author_id) REFERENCES author(author_id),
    CONSTRAINT fk_creado_por_course_id FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- SELECT c.id, c.title, c.description, l.language, c.image FROM courses c
-- INNER JOIN languages l
-- WHERE l.language = 'python' AND l.id = c.type_id;

