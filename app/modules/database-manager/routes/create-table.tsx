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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router";
import { AppCard } from "~/components/AppCard";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  function addColumn() {
    setColumns([...columns, defaultColumn]);
  }

  function saveColumn(column: Column, index: number) {
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
    setColumns([...currentColumns]);
    console.log("logs", {
      current_columns: columns,
      new_column: column,
    });
  }

  function removeColumn(index: number) {
    if (columns.length > 1) {
      const newColumns = [...columns];
      newColumns.splice(index, 1);
      setColumns([...newColumns]);
    } else {
      alert("Não é possível excluir a única coluna da tabela");
    }
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
      <Card variant="contained" className="mb-20">
        <Button
          onClick={() => navigate("/")}
          variant="text"
          startIcon={<ArrowBackIcon />}
          size="large"
        >
          Voltar
        </Button>
        <CardContent>
          <h1 className="text-center ma-2 text-2xl">Crie sua tabela aqui!</h1>
          <AppForm onSubmit={submit}>
            <div>
              <AppLabel>Nome da Tabela</AppLabel>
              <AppInput
                onChange={(e) => setTableName(String(e.target?.value))}
              />
            </div>
            <div className="table-columns">
              <AppLabel>Colunas:</AppLabel>
              {columns.map((column, index) => (
                <FormColumn
                  key={`column-${index}`}
                  column={column}
                  addColumn={(column) => saveColumn(column, index)}
                  removeColumn={() => removeColumn(index)}
                  tablesName={allTablesName}
                />
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <Button
                type="button"
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={addColumn}
              >
                Adicionar coluna
              </Button>
            </div>
            <div className="mt-10">
              <Button className="w-full" variant="contained" type="submit">
                Criar Tabela
              </Button>
            </div>
          </AppForm>
        </CardContent>
      </Card>
    </>
  );
}
