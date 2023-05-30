create TABLE IF NOT EXISTS students(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    gender CHAR(1),
    age INT,
    course INT,
    email VARCHAR(255),
    phone VARCHAR(15)
);
create TABLE IF NOT EXISTS articles(
    id SERIAL,
    title VARCHAR(255),
    created_at DATE,
    student_id INTEGER,
    FOREIGN KEY (student_id) REFERENCES students(id)
);

INSERT INTO students (id,name, gender, age, course, email, phone)
VALUES (1,'Мальков Павел', 'М', 23, '2','pochta@mail.ru','+79687541243');

--id, title, created_at, student_id
--\copy articles FROM 'C:\Users\Pavel\Downloads\article.csv' DELIMITER ';' CSV HEADER;


INSERT INTO students (id,name, gender, age, course, email, phone)
VALUES (102,'Петров Николай', 'М', 21, '1','guro@mail.ru','+79548794248');

INSERT INTO students (name, gender, age, course, email, phone)
VALUES ('Римсков Георгий', 'М', 24, '4','georgi@mail.ru','+79147957643');

INSERT INTO students (name, gender, age, course, email, phone)
VALUES ('Кто-то', 'М', 23, '3','georgi@mail.ru','+79147957643');


--UPDATE public.students
--SET name=students.name, gender=students.gender, age=students.age, course=students.course, email=email, phone=students.phone

--select * from students Order by id ASC;
--select * from articles Order by id ASC;

--INSERT INTO articles (title, created_at, student_id)
--VALUES ('Своя статья, как ее написать', '22.05.2022','1');

select * from students order by id asc;

select * from articles where student_id = '22';

DROP TABLE students;
DROP TABLE articles;