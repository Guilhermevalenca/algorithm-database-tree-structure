import { useNavigate } from "react-router";
import { AppButton } from "~/components/AppButton";
import { ShowTables } from "../components/show-tables";
import { Database } from "../classes/database.class";
import { Table } from "../classes/table.class";
import type { Column } from "../interfaces/column.interface";
import { ColumnEnum } from "../enums/column.enum";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

export default function DatabaseManagerRoute() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-2xl text-center">Gerenciamento de Banco de Dados</h1>
      <div className="mt-4 mb-4 flex justify-end">
        <Button
          color="success"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/database-manager/create-table")}
        >
          Criar Tabela
        </Button>
      </div>
      <ShowTables />
      <br />
    </>
  );
}

// const userSchema: Column[] = [
//   { name: "id", type: ColumnEnum.INT, nullable: false, primaryKey: true },
//   { name: "name", type: ColumnEnum.STRING, nullable: false },
//   { name: "age", type: ColumnEnum.INT, nullable: false },
// ];

// const postSchema: Column[] = [
//   { name: "id", type: ColumnEnum.INT, nullable: false, primaryKey: true },
//   { name: "title", type: ColumnEnum.STRING, nullable: false },
//   { name: "content", type: ColumnEnum.STRING, nullable: false },
//   {
//     name: "user_id",
//     type: ColumnEnum.INT,
//     nullable: false,
//     foreignKey: { table: "users", column: "id" },
//   },
// ];
// const db = new Database();

// const usersTable = new Table("users", userSchema, db);

// const postsTable = new Table("posts", postSchema, db);

// db.addTable(usersTable);
// db.addTable(postsTable);

// usersTable.insert({ name: "Ana", age: 32 });
// usersTable.insert({ name: "Guilherme", age: 32 });
// usersTable.insert({ name: "Claudiane", age: 32 });
// usersTable.insert({ name: "Gabriel", age: 32 });
// usersTable.insert({ name: "Betinho", age: 32 });
// usersTable.insert({ name: "João", age: 32 });
// usersTable.insert({ name: "Maria", age: 32 });

// console.log(usersTable);

// postsTable.insert({
//   title: "Meu primeiro post",
//   content: "Olá mundo",
//   user_id: 1, // FK válida
// });

// postsTable.insert({
//   title: "Meu primeiro post",
//   content: "Olá mundo",
//   user_id: 1, // FK válida
// });

// postsTable.insert({
//   title: "Meu primeiro post",
//   content: "Olá mundo",
//   user_id: 2, // FK válida
// });

// postsTable.insert({
//   title: "Meu primeiro post",
//   content: "Olá mundo",
//   user_id: 2, // FK válida
// });

// postsTable.insert({
//   title: "Meu primeiro post",
//   content: "Olá mundo",
//   user_id: 3, // FK válida
// });

// postsTable.insert({
//   title: "Meu primeiro post",
//   content: "Olá mundo",
//   user_id: 3, // FK válida
// });

// postsTable.insert({
//   title: "Meu primeiro post",
//   content: "Olá mundo",
//   user_id: 3, // FK válida
// });

// postsTable.insert({
//   title: "Meu primeiro post",
//   content: "Olá mundo",
//   user_id: 3, // FK válida
// });

// console.log(usersTable.all());
