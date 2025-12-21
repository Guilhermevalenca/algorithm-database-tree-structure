import { Link, Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/example">Example</Link>
            </li>
            <li>
              <Link to="/database-manager">Database Manager</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
