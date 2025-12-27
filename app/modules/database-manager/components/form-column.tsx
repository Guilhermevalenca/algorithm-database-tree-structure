import AppLabel from "~/components/AppLabel";
import type { Column } from "../interfaces/column.interface";
import { AppInput } from "~/components/AppInput";
import { AppOption, AppSelect } from "~/components/AppSelect";
import { ColumnEnum } from "../enums/column.enum";
import React from "react";
import { AppButton } from "~/components/AppButton";
import "../css/form-column.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import { AppCard } from "~/components/AppCard";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";

type Props = {
  column: Column;
  addColumn: (column: Column) => void;
  removeColumn: () => void;
  tablesName: string[];
};
export function FormColumn(props: Props) {
  const [column, setColumn] = React.useState<Column>({ ...props.column });
  const [hasForeignKey, sethasForeignKey] = React.useState(false);

  function submit() {
    props.addColumn(column);
  }
  return (
    <>
      <AppCard variant="outlined" backgroundColor="paper">
        <CardContent>
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
                Tipo da coluna:
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
              <FormControlLabel
                label="Pode ser nulo"
                control={
                  <Checkbox
                    checked={column.nullable}
                    onChange={(e) => {
                      setColumn({
                        ...column,
                        nullable: Boolean(e.target?.checked),
                      });
                    }}
                  />
                }
              ></FormControlLabel>
            </div>
            <div>
              <FormControlLabel
                label="Chave primária"
                control={
                  <Checkbox
                    checked={column.primaryKey}
                    onChange={(e) =>
                      setColumn({
                        ...column,
                        primaryKey: Boolean(e.target?.checked),
                      })
                    }
                  />
                }
              ></FormControlLabel>
              <div>
                <FormControlLabel
                  label="Recebe chave estrangeira"
                  control={
                    <Checkbox
                      checked={hasForeignKey}
                      onChange={(e) => sethasForeignKey(e.target.checked)}
                    />
                  }
                />
              </div>
            </div>
            <div>
              {hasForeignKey && (
                <>
                  <AppLabel>Chave estrangeira</AppLabel>
                  <div>
                    <AppLabel>
                      Selecione a tabela:
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
                      Nome da coluna:
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
                        Obs.: A Chave estrangeira só é adicionada se adicionar a
                        tabela e coluna
                      </small>
                    </AppLabel>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button
              type="button"
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={submit}
            >
              salvar coluna
            </Button>
            <Button
              type="button"
              variant="contained"
              color="error"
              startIcon={<RemoveIcon />}
              onClick={props.removeColumn}
            >
              remover coluna
            </Button>
          </div>
        </CardContent>
      </AppCard>
    </>
  );
}
