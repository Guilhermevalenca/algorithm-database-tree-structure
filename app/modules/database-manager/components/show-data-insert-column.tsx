import type { Table } from "../classes/table.class";
import { AppInput } from "~/components/AppInput";
import { getTypeInputUtil } from "../utils/get-type-input.util";
import React from "react";
import type { Row } from "../types/row.type";
import { AppButton } from "~/components/AppButton";

type Props = {
  table: Table;
  cancel: () => void;
  save: (row: Row) => void;
};

export function ShowDataInsertColumn({ table, cancel, save }: Props) {
  const [newRow, setNewRow] = React.useState<Row>({
    ...Object.fromEntries(table.schema.map((column) => [column.name, ""])),
  });
  return (
    <tr>
      {table.schema.map((column) => (
        <td key={`column-${column.name}-insert`}>
          <AppInput
            type={getTypeInputUtil(column)}
            value={
              column.name === table.getPrimaryKey()
                ? "default value"
                : newRow[column.name]
            }
            onChange={(e) =>
              setNewRow({ ...newRow, [column.name]: e.target.value })
            }
            disabled={column.name === table.getPrimaryKey()}
          />
        </td>
      ))}
      <td>
        <AppButton onClick={() => cancel()}>Cancelar</AppButton>
        <AppButton onClick={() => save(newRow)}>Salvar</AppButton>
      </td>
    </tr>
  );
}
