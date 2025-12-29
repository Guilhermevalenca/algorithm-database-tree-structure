import React from "react";
import { Database } from "../classes/database.class";
import type { Route } from "./+types";
import { AppButton } from "~/components/AppButton";
import type { Row } from "../types/row.type";
import "../css/show-tables.css";
import type { Table } from "../classes/table.class";
import { ShowDataColumn } from "../components/show-data-column";
import { ShowDataInsertColumn } from "../components/show-data-insert-column";
import { FilterData } from "../components/filter-data";
import AppLabel from "~/components/AppLabel";
import { AppInput } from "~/components/AppInput";
import { AppCard } from "~/components/AppCard";
import CardContent from "@mui/material/CardContent";

type Filter = {
  row?: Row | undefined;
  value?: string | undefined;
};

export default function DataTableRoute({ params }: Route.ComponentProps) {
  const [table, setTable] = React.useState<Table>();
  const [isAdding, setIsAdding] = React.useState(false);
  const [range, setRange] = React.useState<[number, number]>([0, 0]);
  const [filter, setFilter] = React.useState<Filter>({
    row: undefined,
    value: undefined,
  });

  const fetch = React.useCallback(async (db: Database) => {
    //@ts-expect-error exist table_name in params
    setTable(db.getTable(String(params?.table_name)));
  }, []);

  React.useEffect(() => {
    fetch(Database.load());
  }, [fetch]);

  async function deleteRow(row: Row) {
    if (table) {
      table.delete(row[table.getPrimaryKey()]);
      await fetch(Database.load());
    }
  }

  async function updateRow(row: Row) {
    if (table) {
      const updatedRow: Row = {
        ...row,
      };
      delete updatedRow[table.getPrimaryKey()];
      table.update(row[table.getPrimaryKey()], updatedRow);
      await fetch(Database.load());
    }
  }

  async function save(row: Row) {
    if (table) {
      const newRow: Row = {
        ...row,
      };
      delete newRow[table.getPrimaryKey()];

      table.insert(newRow);
      await fetch(Database.load());
      setIsAdding(false);
    }
  }

  async function selectFilter(row: Row | "none", value: string) {
    setFilter({
      row: row === "none" ? undefined : row,
      value: String(value).trim() === "" ? undefined : value,
    });
  }

  return (
    <AppCard className="mb-20">
      <CardContent className="flex flex-col gap-4">
<h1 className="text-center text-2xl">Dados de {table?.name}</h1>
      {table && <FilterData table={table} selectFilter={selectFilter} />}
      <div className="flex flex-col gap-4 p-4">
        <p>Selecione o intervalo de linhas que deseja visualizar:</p>
        <div className="flex flex-row gap-4">
          <AppLabel>
            <div className="flex flex-row items-center whitespace-nowrap">
              Valor inicial:
          <AppInput
            type="number"
            onChange={(e) => setRange([Number(e.target.value), range[1]])}
          />
            </div>
        </AppLabel>
        <br />
        <AppLabel>
          <div className="flex flex-row items-center whitespace-nowrap">
            Valor Final:
          <AppInput
            type="number"
            onChange={(e) => setRange([range[0], Number(e.target.value)])}
          />
          </div>
        </AppLabel>
        </div>
        <small>Obs.: 0 exibe todas as linhas</small>
      </div>
      <h2 className="text-center text-xl mb-4">Visualização dos dados</h2>
      {table && (
        <table className="show-tables">
          <thead>
            <tr>
              {table.schema.map((column) => (
                <th key={`column-${column.name}`}>{column.name}</th>
              ))}
              <th>Actions:</th>
            </tr>
          </thead>
          <tbody>
            {table
              // @ts-expect-error filter row and value
              .filter(range, filter?.row, filter?.value)
              .map((row, index) => (
                <ShowDataColumn
                  key={`row-${index}`}
                  table={table}
                  row={row}
                  deleteRow={deleteRow}
                  updateRow={updateRow}
                />
              ))}
            {isAdding && (
              <ShowDataInsertColumn
                table={table}
                cancel={() => setIsAdding(false)}
                save={save}
              />
            )}
          </tbody>
        </table>
      )}
      <AppButton className="mt-2" onClick={() => setIsAdding(true)}>
        Adicionar dados
      </AppButton>
      </CardContent>
    </AppCard>
  );
}
