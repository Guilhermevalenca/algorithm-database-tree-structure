import React from "react";
import { Database } from "../classes/database.class";
import type { Route } from "./+types";
import AppLabel from "~/components/AppLabel";
import { AppInput } from "~/components/AppInput";
import { FormColumn } from "../components/form-column";
import type { Column } from "../interfaces/column.interface";
import { AppButton } from "~/components/AppButton";
import { ColumnEnum } from "../enums/column.enum";
import { Table } from "../classes/table.class";
import { useNavigate } from "react-router";
import swal from "../../../plugins/swal";
import { AppForm } from "~/components/AppForm";
import CardContent from "@mui/material/CardContent";
import { AppCard } from "~/components/AppCard";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

export default function UpdateTableRoute({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const db = Database.load();
  //@ts-expect-error exist table_name
  const [table] = React.useState(db.getTable(String(params?.table_name)));
  const [tableName, setTableName] = React.useState<string>(table.name);
  const [columns, setColumns] = React.useState<Column[]>(table.schema);
  const [allTablesName] = React.useState<string[]>(db.getTablesName());

  function newColumn() {
    const newColumns = [...columns];
    newColumns.push(defaultColumn);
    setColumns([...newColumns]);
  }

  function addColumn(column: Column, index: number) {
    const newColumns = [...columns];
    newColumns[index] = column;
    setColumns([...newColumns]);
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
      navigate("/");
    } catch (error) {
      console.log(error);
      swal.fire({
        html: (error as Error).message,
      });
    }
  }

  return (
    <AppCard className="mb-20">
      <Button onClick={() => navigate("/")} variant="text" startIcon={<ArrowBackIcon />} size="large">Voltar</Button>
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-center text-2xl">Atualizar {table?.name}</h2>
        <AppForm className="flex flex-col gap-4" onSubmit={submit}>
          <div>
            <AppLabel>
              Nome da tabela:
              <AppInput
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
              />
            </AppLabel>
          </div>
          <div>
            <AppLabel>
              Colunas:
              {columns.map((column, index) => (
                <FormColumn
                  key={index}
                  column={column}
                  addColumn={(column) => addColumn(column, index)}
                  removeColumn={() => removeColumn(index)}
                  tablesName={allTablesName}
                />
              ))}
            </AppLabel>
          </div>
          <div className="mt-2 flex justify-end">
            <Button
              type="button"
              onClick={() => newColumn()}
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
            >
              Adicionar nova coluna
            </Button>
          </div>
          <div className="mt-10">
            <Button variant="contained" type="submit" className="w-full">
              Atualizar tabela
            </Button>
          </div>
        </AppForm>
      </CardContent>
    </AppCard>
  );
}
