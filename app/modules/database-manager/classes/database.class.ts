import { Table } from "./table.class";

export class Database {
  private tables = new Map<string, Table>();
  // private static readonly FILE = "database.json";

  addTable(table: Table) {
    this.tables.set(table.name, table);
    this.save();
  }

  deleteTable(name: string) {
    this.tables.delete(name);
    this.save();
  }

  getTable(name: string): Table {
    const table = this.tables.get(name);
    if (!table) throw new Error(`Tabela ${name} não encontrada`);
    return table;
  }

  save(): void {
    const payload: any = { tables: {} };

    for (const [name, table] of this.tables.entries()) {
      payload.tables[name] = table.dump();
    }

    localStorage.setItem("database", JSON.stringify(payload, null, 2));
  }

  getTablesName() {
    return Array.from(this.tables.keys());
  }

  getTables() {
    return Array.from(this.tables.values());
  }

  static load(): Database {
    const db = new Database();
    const raw = localStorage.getItem("database");

    if (!raw) {
      return db;
    }

    const parsed = JSON.parse(raw ?? "{}");

    for (const tableName of Object.keys(parsed.tables)) {
      const tableData = parsed.tables[tableName];

      const table = new Table(tableName, tableData.schema, db);

      db.tables.set(tableName, table);
    }

    for (const tableName of Object.keys(parsed.tables)) {
      const tableData = parsed.tables[tableName];
      const table = db.getTable(tableName);

      for (const row of tableData.rows) {
        table.insert(row);
      }
    }

    return db;
  }
}
