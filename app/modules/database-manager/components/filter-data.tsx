import AppLabel from "~/components/AppLabel";
import { AppSelect } from "~/components/AppSelect";
import type { Table } from "../classes/table.class";
import { AppInput } from "../../../components/AppInput";
import React from "react";
import type { Row } from "../types/row.type";
import { getTypeInputUtil } from "../utils/get-type-input.util";

type Props = {
  table: Table;
  selectFilter: (row: Row | "none", value: string) => void;
};

export function FilterData({ table, selectFilter }: Props) {
  const [rowSelected, setRow] = React.useState<Row | "none">("none");
  const [value, setValue] = React.useState<any>("");

  React.useEffect(() => {
    selectFilter(rowSelected, value);
  }, [rowSelected, value]);

  function setRowSelected(row_name: string) {
    const row = table?.schema.find((c) => c.name === row_name);
    if (row) {
      setRow(row);
      return;
    }
    setRow("none");
  }

  return (
    <div className="flex">
      <p>Filtros:</p>
      <AppLabel>
        Selecione a coluna
        <AppSelect
          value={rowSelected === "none" ? "none" : rowSelected.name}
          onChange={(e) => setRowSelected(e.target.value)}
        >
          <option value="none">Nenhum</option>
          {table?.schema.map((column) => (
            <option key={column.name} value={column.name}>
              {column.name}
            </option>
          ))}
        </AppSelect>
      </AppLabel>
      <AppLabel>
        Selecione o valor
        <AppInput
          type={
            rowSelected !== "none"
              ? //@ts-expect-error rowSelected
                getTypeInputUtil(rowSelected as Row)
              : "text"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </AppLabel>
    </div>
  );
}
