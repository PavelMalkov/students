create TABLE IF NOT EXISTS students(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    course BIT,
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