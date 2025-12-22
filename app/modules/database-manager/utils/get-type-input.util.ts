import { ColumnEnum } from "../enums/column.enum";
import type { Column } from "../interfaces/column.interface";

export function getTypeInputUtil(column: Column) {
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
