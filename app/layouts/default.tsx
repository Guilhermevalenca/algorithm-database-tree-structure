import type MenuItem from "@mui/material/MenuItem";
import { Link, Outlet } from "react-router";
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';

export default function DefaultLayout() {
  return (
    <>
    <AppBar>
      <div className="flex flex-row gap-4 ml-auto mr-auto">
    <div>
          <Link className="text-2xl" to="/">Database Manager</Link>
      </div>
      </div>
    </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  );
}
