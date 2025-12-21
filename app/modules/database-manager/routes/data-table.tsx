import React from "react";
import { Database } from "../classes/database.class";
import type { Route } from "./+types";
import { AppButton } from "~/components/AppButton";
import type { Row } from "../types/row.type";
import "../css/show-tables.css";
import type { Table } from "../classes/table.class";
import { ShowDataColumn } from "../components/show-data-column";

export default function DataTableRoute({ params }: Route.ComponentProps) {
  const [table, setTable] = React.useState<Table>();

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

  return (
    <>
      <h2>Dados:</h2>
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
            {table.all().map((row, index) => (
              <ShowDataColumn
                key={`row-${index}`}
                table={table}
                row={row}
                deleteRow={deleteRow}
                updateRow={updateRow}
              />
            ))}
          </tbody>
        </table>
      )}
      <AppButton>Adicionar Coluna</AppButton>
    </>
  );
}
