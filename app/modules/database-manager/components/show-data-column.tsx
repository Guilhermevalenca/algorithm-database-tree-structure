import AppLabel from "~/components/AppLabel";
import { ColumnEnum } from "../enums/column.enum";
import type { Column } from "../interfaces/column.interface";
import { AppInput } from "~/components/AppInput";
import type { Row } from "../types/row.type";
import React, { useEffect } from "react";
import type { Table } from "../classes/table.class";
import { AppButton } from "~/components/AppButton";

type Props = {
  table: Table;
  row: Row;
  deleteRow: (row: Row) => void;
  updateRow: (row: Row) => void;
};

function getTypeInput(column: Column) {
  let type_input = "";

  switch (column.type) {
    case ColumnEnum.INT:
      type_input = "number";
      break;
    case ColumnEnum.STRING:
      type_input = "text";
      break;
    case ColumnEnum.FLOAT:
      type_input = "number";
      break;
    case ColumnEnum.BOOLEAN:
      type_input = "checkbox";
      break;
    case ColumnEnum.DATE:
      type_input = "date";
      break;
    default:
      type_input = "text";
      break;
  }
  return type_input;
}

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
              type={getTypeInput(column)}
              value={currentRow[column.name]}
              onChange={(e) =>
                setCurrentRow({ ...currentRow, [column.name]: e.target.value })
              }
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
