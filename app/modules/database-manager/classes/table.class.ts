import type { BPlusTree } from "../interfaces/b-plus-tree.interface";
import type { Column } from "../interfaces/column.interface";
import type { Row } from "../types/row.type";
import type { Database } from "./database.class";
import { SimpleBPlusTree } from "./simple-b-plus-tree.class";

export class Table {
  public name: string;
  public schema: Column[];

  public primaryIndex: BPlusTree<number, Row>;
  private db: Database;

  constructor(name: string, schema: Column[], db: Database) {
    this.name = name;
    this.schema = schema;
    this.primaryIndex = new SimpleBPlusTree<number, Row>();
    this.db = db;

    db.addTable(this);
  }

  getPrimaryKey(): string {
    const pkColumn = this.schema.find((c) => c?.primaryKey);
    if (!pkColumn) {
      throw new Error("Tabela sem chave primária");
    }
    return pkColumn.name;
  }

  insert(row: Row): void {
    const pkColumn = this.schema.find((c) => c.primaryKey);
    if (!pkColumn) {
      throw new Error("Tabela sem chave primária");
    }

    let pk = row[pkColumn.name] as number;

    if (pk === undefined || pk === null) {
      const lastId = this.all().at(-1)?.[pkColumn.name];
      pk = lastId ? lastId + 1 : 1;
    }

    if (this.primaryIndex.search(pk)) {
      throw new Error("Violação de chave primária");
    }

    for (const column of this.schema) {
      if (column.foreignKey) {
        if (!this.db) {
          throw new Error("Database é necessária para validar FK");
        }

        const fkValue = row[column.name];
        const foreignTable = this.db.getTable(column.foreignKey.table);

        const exists = foreignTable.findByPK(fkValue);
        if (!exists) {
          throw new Error(
            `Violação de chave estrangeira: ${column.name} -> ${column.foreignKey.table}.${column.foreignKey.column}`
          );
        }
      }
    }

    this.primaryIndex.insert(pk, { [pkColumn.name]: pk, ...row });
    this.db.save();
  }

  findByPK(pk: number): Row | null {
    return this.primaryIndex.search(pk);
  }

  delete(pk: number): void {
    const existing = this.primaryIndex.search(pk);
    if (!existing) {
      throw new Error("Registro nao encontrado");
    }
    //avaliar se a chave primary da tabela atual é uma chave estrangeira em outra tabela
    const tables = this.db.getTables();
    const tablesWithFK = tables.filter((t) => {
      return t.schema.some((c) => {
        return c?.foreignKey && c.foreignKey.table === this.name;
      });
    });

    if (tablesWithFK.length > 0) {
      for (const table of tablesWithFK) {
        const column_name = table.schema.find((c) => {
          return c?.primaryKey;
        })?.name;

        for (const row of table.all()) {
          if (row?.[String(column_name)] === pk) {
            table.delete(row?.[String(column_name)]);
          }
        }
      }
    }

    this.primaryIndex.delete(pk);
    this.db.save();
  }

  update(pk: number, newData: Partial<Row>): void {
    const existing = this.primaryIndex.search(pk);

    if (!existing) {
      throw new Error("Registro não encontrado");
    }

    const pkColumn = this.schema.find((c) => c.primaryKey);
    if (!pkColumn) {
      throw new Error("Tabela sem chave primária");
    }

    if (pkColumn.name in newData) {
      throw new Error("Não é permitido alterar a chave primária");
    }

    const updatedRow: Row = {
      ...existing,
      ...newData,
    };

    this.primaryIndex.delete(pk);
    this.primaryIndex.insert(pk, updatedRow);
    this.db.save();
  }

  all(): Row[] {
    return this.primaryIndex.rangeSearch(
      Number.MIN_SAFE_INTEGER as any,
      Number.MAX_SAFE_INTEGER as any
    );
  }

  dump() {
    return {
      schema: this.schema,
      rows: this.primaryIndex.rangeSearch(
        Number.MIN_SAFE_INTEGER as any,
        Number.MAX_SAFE_INTEGER as any
      ),
    };
  }
}
