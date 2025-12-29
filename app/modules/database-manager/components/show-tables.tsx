import React from "react";
import { Database } from "../classes/database.class";
import "../css/show-tables.css";
import { AppButton } from "~/components/AppButton";
import { useNavigate } from "react-router";
import { AppCard } from "~/components/AppCard";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

export function ShowTables() {
  const navigate = useNavigate();
  const db = Database.load();
  const [tables] = React.useState(db.getTables());

  function deleteTable(table_name: string) {
    db.deleteTable(table_name);
  }
  return (
    <>
      {tables.map((table) => (
        <Card
          key={`table-${table.name}`}
          variant="contained"
          backgroundColor="default"
          className="mb-4"
        >
          <CardContent>
            <div>
              <h1 className="text-xl text-center">{table.name}</h1>
              <div>
                <div className="flex flex-row gap-2 items-center justify-end mb-2 mt-4">
                  <p>Ações:</p>
                  <AppButton
                    onClick={() =>
                      navigate(`/database-manager/data/${table.name}`)
                    }
                  >
                    Visualizar dados da tabela
                  </AppButton>
                  <AppButton
                    onClick={() =>
                      navigate(`/database-manager/update-table/${table.name}`)
                    }
                  >
                    Atualizar tabela
                  </AppButton>
                  <AppButton onClick={() => deleteTable(table.name)}>
                    Deletar tabela
                  </AppButton>
                </div>
              </div>
            </div>
            <table className="show-tables">
              <thead>
                <tr>
                  <th>Nome da coluna</th>
                  <th>Tipo da coluna</th>
                  <th>Pode ser Nula</th>
                  <th>Chave Primária</th>
                  <th>Chave Estrangeira</th>
                </tr>
              </thead>
              <tbody>
                {table.schema.map((column) => (
                  <tr key={`table-${table.name}-column-${column.name}`}>
                    <td>{column.name}</td>
                    <td>{String(column.type).toUpperCase()}</td>
                    <td>{column.nullable ? "Sim" : "Não"}</td>
                    <td>{column?.primaryKey ? "Sim" : "Não"}</td>
                    <td>
                      {column?.foreignKey
                        ? `${column.foreignKey.table}.${column.foreignKey.column}`
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
