import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home/Home";
import authLayout from "../layouts/authLayout";
import Login from "../pages/authPages/Login/Login";
import RegistyerEmployee from "../pages/authPages/Register/RegistyerEmployee";
import RegisterHR from "../pages/authPages/Register/RegisterHR";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome/DashboardHome";
import AddAsset from "../pages/dashboard/AddAsset/AddAsset";
import AssetList from "../pages/dashboard/AssetList/AssetList";
import UpgradePackage from "../pages/dashboard/UpgradePackage/UpgradePackage";
import AllRequests from "../pages/dashboard/AllRequests/AllRequests";
import AllEmployees from "../pages/dashboard/AllEmployees/AllEmployees";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    Component: authLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register-employee",
        Component: RegistyerEmployee,
      },
      {
        path: "register-hr",
        Component: RegisterHR,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "add-asset",
        Component: AddAsset,
      },
      {
        path: "asset-list",
        Component: AssetList,
      },
      {
        path: "all-requests",
        Component: AllRequests,
      },
      {
        path: "all-employees",
        Component: AllEmployees,
      },
      {
        path: "upgrade-package",
        Component: UpgradePackage,
      },
    ],
  },
]);
