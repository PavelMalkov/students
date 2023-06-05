create TABLE IF NOT EXISTS students(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    gender CHAR(1),
    age INT,
    course INT,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15)
);
create TABLE IF NOT EXISTS articles(
    id SERIAL,
    title VARCHAR(255) NOT NULL,
    created_at DATE,
    student_id INTEGER,
    FOREIGN KEY (student_id) REFERENCES students(id)
);

INSERT INTO students (name, gender, age, course, email, phone)
VALUES ('Мальков Павел', 'М', 23, '2','pochta@mail.ru','+79687541243');

INSERT INTO students (name, gender, age, course, email, phone)
VALUES ('Петров Николай', 'М', 21, '1','guro@mail.ru','+79548794248');

INSERT INTO students (name, gender, age, course, email, phone)
VALUES ('Римсков Георгий', 'М', 24, '4','georgi@mail.ru','+79147957643');

INSERT INTO students (name, gender, age, course, email, phone)
VALUES ('Кто-то', 'М', 23, '3','georgi@mail.ru','+79147957643');

INSERT INTO articles (title, created_at, student_id)
VALUES ('Своя статья, как ее написать', '22.05.2022','1');
--

--\copy student FROM 'путь\student.csv' DELIMITER ';' CSV HEADER;
--\copy article FROM 'путь\article.csv' DELIMITER ';' CSV HEADER;