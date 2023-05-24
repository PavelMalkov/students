create TABLE students(
    id SERIAL PRIMARY KEY,
    nameStudent VARCHAR(50),
    age INT,
    course BIT,
    emailAddress VARCHAR(255),
    phoneNumber VARCHAR(15)
);
create TABLE articles(
    id SERIAL,
    titleArticles VARCHAR(255),
    dataCreate DATE,
    students_id INTEGER,
    FOREIGN KEY (students_id) REFERENCES students(id)
);