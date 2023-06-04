import React, { useState } from "react";
import Table from "../components/table/Table";
import { ArticleService, StudentService } from "../API";
import { AddStudent } from "../components/form/addStudent";
import { AddArticle } from "../components/form/addArticle";

const TablesPage = () => {

  const [columnDefsStudents] = useState([
    { field: 'id' }, //hide: 'true'
    { field: 'name' },
    { field: 'gender' },
    { field: 'age' },
    { field: 'course' },
    { field: 'email' },
    { field: 'phone' },
  ]);

  const [columnDefsArticle] = useState([
    { field: 'id' },
    { field: 'title', minWidth: 700 },
    { field: 'createdAt' },
    { field: 'studentId' },
  ]);

  return (
    <div>
      <Table ServerApi={StudentService} columnDefs={columnDefsStudents} AddForm={AddStudent}
        nameAdd={"Добавить студента"}
        nameUpdate={"Обновить студента"}
        nameDelete={"Удалить студента"}
      />
      <Table ServerApi={ArticleService} columnDefs={columnDefsArticle} AddForm={AddArticle}
        // кажется надо убрать
        nameAdd={"Добавить статью"}
        nameUpdate={"Обновить статью"}
        nameDelete={"Удалить статью"}
      />
    </div>
  );
};

export default TablesPage;
