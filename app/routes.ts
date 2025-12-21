import {
  type RouteConfig,
  index,
  route,
  prefix,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("layouts/default.tsx", [
    index("modules/home/route.tsx"),
    route("example", "modules/example/route.tsx"),

    ...prefix("database-manager", [
      index("modules/database-manager/routes/index.tsx"),
      route("create-table", "modules/database-manager/routes/create-table.tsx"),
      route(
        "update-table/:table_name",
        "modules/database-manager/routes/update-table.tsx"
      ),
      route(
        "data/:table_name",
        "modules/database-manager/routes/data-table.tsx"
      ),
    ]),
  ]),
] satisfies RouteConfig;
