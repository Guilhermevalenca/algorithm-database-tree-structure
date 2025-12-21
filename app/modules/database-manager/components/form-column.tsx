import AppLabel from "~/components/AppLabel";
import type { Column } from "../interfaces/column.interface";
import { AppInput } from "~/components/AppInput";
import { AppOption, AppSelect } from "~/components/AppSelect";
import { ColumnEnum } from "../enums/column.enum";
import React from "react";
import { AppButton } from "~/components/AppButton";
import "../css/form-column.css";

type Props = {
  column: Column;
  addColumn: (column: Column) => void;
  removeColumn: () => void;
  tablesName: string[];
};

export function FormColumn(props: Props) {
  const [column, setColumn] = React.useState<Column>({ ...props.column });

  function submit() {
    props.addColumn(column);
  }
  return (
    <>
      <div className="form-column">
        <div>
          <AppLabel>
            Nome da coluna
            <AppInput
              type="text"
              value={column.name}
              onChange={(e) =>
                setColumn({
                  ...column,
                  name: String(e.target?.value),
                })
              }
            />
          </AppLabel>
        </div>
        <div>
          <AppLabel>
            Tipo da coluna
            <AppSelect
              value={column.type}
              onChange={(
                e //@ts-expect-error
              ) => setColumn({ ...column, type: e.target?.value })}
            >
              {Object.values(ColumnEnum).map((type) => (
                <AppOption key={type} value={type}>
                  {type}
                </AppOption>
              ))}
            </AppSelect>
          </AppLabel>
        </div>
        <div>
          <AppLabel>
            O campo pode ser nulo?
            <AppInput
              type="checkbox"
              checked={column.nullable}
              onChange={(e) => {
                setColumn({
                  ...column,
                  nullable: Boolean(e.target?.checked),
                });
              }}
            />
          </AppLabel>
        </div>
        <div>
          <AppLabel>
            Chave primária
            <AppInput
              type="checkbox"
              checked={column.primaryKey}
              onChange={(e) =>
                setColumn({
                  ...column,
                  primaryKey: Boolean(e.target?.checked),
                })
              }
            />
          </AppLabel>
        </div>
        <div>
          <AppLabel>Chave estrangeira</AppLabel>
          <div>
            <AppLabel>
              Selecione a tabela
              <AppSelect
                value={column.foreignKey?.table}
                onChange={(e) =>
                  setColumn({
                    ...column,
                    foreignKey: {
                      table: String(e.target?.value),
                      column: column.foreignKey?.column ?? "",
                    },
                  })
                }
              >
                {props.tablesName.map((table) => (
                  <AppOption key={table} value={table}>
                    {table}
                  </AppOption>
                ))}
              </AppSelect>
            </AppLabel>
          </div>
          <div>
            <AppLabel>
              Nome da coluna
              <AppInput
                type="text"
                value={column.foreignKey?.column}
                onChange={(e) =>
                  setColumn({
                    ...column,
                    foreignKey: {
                      table: column.foreignKey?.table ?? "",
                      column: String(e.target?.value),
                    },
                  })
                }
              />
              <br />
              <small>
                Obs.: A Chave estrangeira só é adicionar se adicionar a tabela e
                coluna
              </small>
            </AppLabel>
          </div>
        </div>
      </div>
      <AppButton type="button" onClick={submit}>
        Adicionar coluna
      </AppButton>
      <AppButton type="button" onClick={props.removeColumn}>
        limpar coluna
      </AppButton>
    </>
  );
}
