//schema:

import React from "react";
import { Database } from "../classes/database.class";
import { ColumnEnum } from "../enums/column.enum";
import type { Column } from "../interfaces/column.interface";
import { Table } from "../classes/table.class";
import swal from "../../../plugins/swal";
import { AppForm } from "~/components/AppForm";
import AppLabel from "~/components/AppLabel";
import { AppInput } from "~/components/AppInput";
import { FormColumn } from "../components/form-column";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router";
import { AppCard } from "~/components/AppCard";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const defaultColumn = {
  name: "",
  type: ColumnEnum.STRING,
  nullable: false,
  primaryKey: false,
  foreignKey: {
    table: "",
    column: "",
  },
};

export default function CreateTableRoute() {
  const navigate = useNavigate();
  const db = Database.load();
  const [tableName, setTableName] = React.useState<string>("");
  const [columns, setColumns] = React.useState<Column[]>([defaultColumn]);
  const [allTablesName] = React.useState<string[]>(db.getTablesName());

  function addColumn(column: Column, index: number) {
    console.log(column);
    if (
      column.foreignKey?.column.trim() === "" ||
      column.foreignKey?.table.trim() === ""
    ) {
      column.foreignKey = undefined;
    }
    const currentColumns = [...columns];
    currentColumns[index] = {
      ...column,
      foreignKey:
        column?.foreignKey?.table && column?.foreignKey?.column
          ? {
              table: column.foreignKey.table.trim(),
              column: column.foreignKey.column.trim(),
            }
          : {
              table: "",
              column: "",
            },
    };
    setColumns([...currentColumns, defaultColumn]);
    console.log("logs", {
      current_columns: columns,
      new_column: column,
    });
  }

  function removeColumn(index: number) {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns([...newColumns]);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const data = [...columns];
      if (data[data.length - 1].name === "") {
        data.pop();
      }
      new Table(tableName, data, db);
      navigate("/database-manager");
    } catch (error) {
      console.log(error);
      swal.fire({
        html: (error as Error).message,
      });
    }
  }

  return (
    <>
      <Card variant="contained" backgroundColor="default">
        <CardContent>
      <h1 className="text-center ma-2 text-2xl">Crie sua tabela aqui!</h1>
<AppForm onSubmit={submit}>
        <div>
          <AppLabel>Nome da Tabela</AppLabel>
          <AppInput onChange={(e) => setTableName(String(e.target?.value))} />
        </div>
        <div className="table-columns">
          <AppLabel>Colunas:</AppLabel>
          {columns.map((column, index) => (
            <FormColumn
              key={`column-${index}`}
              column={column}
              addColumn={(column) => addColumn(column, index)}
              removeColumn={() => removeColumn(index)}
              tablesName={allTablesName}
            />
          ))}
        </div>
        <br />
        <Button variant="contained" color="secondary" type="submit">Criar Tabela</Button>
      </AppForm>
        </CardContent>
      </Card>
    </>
  );
}
