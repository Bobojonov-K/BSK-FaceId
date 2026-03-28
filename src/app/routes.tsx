import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { Residents } from "./components/Residents";
import { Buildings } from "./components/Buildings";
import { Terminals } from "./components/Terminals";
import { Logs } from "./components/Logs";
import { Reports } from "./components/Reports";
import { Guests } from "./components/Guests";
import { Users } from "./components/Users";
import { Settings } from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "residents", Component: Residents },
      { path: "buildings", Component: Buildings },
      { path: "terminals", Component: Terminals },
      { path: "logs", Component: Logs },
      { path: "reports", Component: Reports },
      { path: "guests", Component: Guests },
      { path: "users", Component: Users },
      { path: "settings", Component: Settings },
    ],
  },
]);