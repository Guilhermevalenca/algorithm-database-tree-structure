import { Database } from "./classes/database.class";
import { Table } from "./classes/table.class";
import type { Column } from "./interfaces/column.interface";
import { ColumnEnum } from "./enums/column.enum";

// criando instancia do banco de dados
const db = new Database();

// exemplo para criar os schema das tabelas
const userSchema: Column[] = [
  { name: "id", type: ColumnEnum.INT, nullable: false, primaryKey: true },
  { name: "name", type: ColumnEnum.STRING, nullable: false },
  { name: "age", type: ColumnEnum.INT, nullable: false },
];

const postSchema: Column[] = [
  { name: "id", type: ColumnEnum.INT, nullable: false, primaryKey: true },
  { name: "title", type: ColumnEnum.STRING, nullable: false },
  { name: "content", type: ColumnEnum.STRING, nullable: false },
  {
    name: "user_id",
    type: ColumnEnum.INT,
    nullable: false,
    foreignKey: { table: "users", column: "id" },
  },
];

// criando as tabelas
const usersTable = new Table("users", userSchema, db);
const postsTable = new Table("posts", postSchema, db);

usersTable.insert({ name: "Guilherme", age: 24 });
usersTable.insert({ name: "Claudiane", age: 24 });
usersTable.insert({ name: "Lucas", age: 26 });

usersTable.update(1, { name: "Joaquim" });

usersTable.delete(2);

console.log(usersTable.all());
console.log(usersTable.findByPK(1));

postsTable.insert({
  title: "Primeiro Post",
  content: "Conteudo do primeiro post",
  user_id: 1,
});

postsTable.insert({
  title: "Segundo Post",
  content: "Conteudo do segundo post",
  user_id: 1,
});

postsTable.insert({
  title: "Terceiro Post",
  content: "Conteudo do terceiro post",
  user_id: 1,
});

postsTable.insert({
  title: "Primeiro post de Lucas",
  content: "Ola, meu nome é Lucas!",
  user_id: 3,
});

//filtrando por range de id
console.log(postsTable.filter([1, 2]));

//filtrando por user_id
console.log(postsTable.filter([0, 0], { name: "user_id" } as Column, 3));

//delete cascade:
usersTable.delete(1);
console.log(postsTable.all());
