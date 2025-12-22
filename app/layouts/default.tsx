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
          <Link to="/">Home</Link>
      </div>
      <div>
          <Link to="/example">Example</Link>
      </div>
      <div>
          <Link to="/database-manager">Database Manager</Link>
      </div>
      </div>
    </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  );
}
