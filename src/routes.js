/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// Auth
import Login from "views/auth/Login.js";

// Admin
import AdminDashboard from "views/admin/Dashboard.js";
import Employee from "views/admin/employee/EmployeeTable.js";

//User
import UserDashboard from "views/user/Dashboard.js";
import Profile from "views/user/Profile.js";

export var managerRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <AdminDashboard />,
    layout: "/admin",
  },
  {
    path: "/employee",
    name: "Employee",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Employee />,
    layout: "/admin",
  }
];

export default managerRoutes;

export var userRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <UserDashboard />,
    layout: "/user",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/user",
  }
];

export var authRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
];
