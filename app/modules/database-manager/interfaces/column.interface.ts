import type { ColumnEnum } from "../enums/column.enum";

export interface Column {
  name: string;
  type: ColumnEnum;
  nullable: boolean;
  primaryKey?: boolean;

  foreignKey?: {
    table: string;
    column: string;
  };
}
