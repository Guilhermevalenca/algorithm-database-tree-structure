import { AppInput } from "~/components/AppInput";
import type { Row } from "../types/row.type";
import React, { useEffect } from "react";
import type { Table } from "../classes/table.class";
import { AppButton } from "~/components/AppButton";
import { getTypeInputUtil } from "../utils/get-type-input.util";

type Props = {
  table: Table;
  row: Row;
  deleteRow: (row: Row) => void;
  updateRow: (row: Row) => void;
};

export function ShowDataColumn({ table, row, deleteRow, updateRow }: Props) {
  const [isEdit, setIsEdit] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(row);

  useEffect(() => {
    if (!isEdit) {
      setCurrentRow(row);
    }
  }, [isEdit]);

  return (
    <tr>
      {table.schema.map((column) => (
        <td key={`column-${column.name}`}>
          {isEdit ? (
            <AppInput
              type={getTypeInputUtil(column)}
              value={currentRow[column.name]}
              onChange={(e) =>
                setCurrentRow({ ...currentRow, [column.name]: e.target.value })
              }
              disabled={column.name === table.getPrimaryKey()}
            />
          ) : (
            <span>{row[column.name]}</span>
          )}
        </td>
      ))}
      {isEdit ? (
        <td>
          <AppButton onClick={() => setIsEdit(false)}>Cancelar</AppButton>
          <AppButton
            onClick={() => {
              updateRow(currentRow);
              setIsEdit(false);
            }}
          >
            Salvar
          </AppButton>
        </td>
      ) : (
        <td>
          <AppButton onClick={() => setIsEdit(true)}>Editar Coluna</AppButton>
          <AppButton onClick={() => deleteRow(row)}>Deletar Coluna</AppButton>
        </td>
      )}
    </tr>
  );
}
