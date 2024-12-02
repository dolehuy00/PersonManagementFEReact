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
import ForgotPassword from "views/auth/ForgotPassword.js"

// Admin
import AdminDashboard from "views/admin/Dashboard.js";
import Employee from "views/admin/employee/EmployeeTable.js";
import EmployeeView from "views/admin/employee/EmployeeView.js";
import Account from "views/admin/account/AccountTable.js";
import AccountView from "views/admin/account/AccountView.js";
import SalaryHistory from "views/admin/salaryHistory/SalaryHistoryTable.js";
import SalaryHistoryView from "views/admin/salaryHistory/SalaryHistoryView.js";
import Department from "views/admin/department/DepartmentTable.js";
import DepartmentView from "views/admin/department/DepartmentView.js";
import Project from "views/admin/project/ProjectTable.js";
import ProjectView from "views/admin/project/ProjectView.js";

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
    viewOnSidebar: true,
  },
  {
    path: "/employee",
    name: "Employee",
    icon: "fa-solid fa-users text-orange",
    component: <Employee />,
    layout: "/admin",
    viewOnSidebar: true,
  },
  {
    path: "/employee/view",
    name: "Employee View",
    icon: "fa-solid fa-users text-orange",
    component: <EmployeeView />,
    layout: "/admin",
    viewOnSidebar: false,
  },
  {
    path: "/account",
    name: "Account",
    icon: "fa-regular fa-address-card text-green",
    component: <Account />,
    layout: "/admin",
    viewOnSidebar: true,
  },
  {
    path: "/account/view",
    name: "Account View",
    icon: "fa-regular fa-address-card text-green",
    component: <AccountView />,
    layout: "/admin",
    viewOnSidebar: false,
  },
  {
    path: "/salary-history",
    name: "Salary",
    icon: "fa-solid fa-hand-holding-dollar text-yellow",
    component: <SalaryHistory />,
    layout: "/admin",
    viewOnSidebar: true,
  },
  {
    path: "/salary-history/view",
    name: "Salary View",
    icon: "fa-solid fa-sack-dollar text-yellow",
    component: <SalaryHistoryView />,
    layout: "/admin",
    viewOnSidebar: false,
  },
  {
    path: "/department",
    name: "Department",
    icon: "fa-solid fa-people-group",
    component: <Department />,
    layout: "/admin",
    viewOnSidebar: true,
  },
  {
    path: "/department/view",
    name: "Department View",
    icon: "fa-solid fa-people-group",
    component: <DepartmentView />,
    layout: "/admin",
    viewOnSidebar: false,
  },
  {
    path: "/project",
    name: "Project",
    icon: "fa-solid fa-folder-open text-blue",
    component: <Project />,
    layout: "/admin",
    viewOnSidebar: true,
  },
  {
    path: "/project/view",
    name: "Project View",
    icon: "fa-solid fa-folder-open text-blue",
    component: <ProjectView />,
    layout: "/admin",
    viewOnSidebar: false,
  }  
];

export default managerRoutes;

export var userRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <UserDashboard />,
    layout: "",
    viewOnSidebar: true,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "",
    viewOnSidebar: true,
  }
];

export var authRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    viewOnSidebar: false,
  },
  {
    path: "/forgot",
    name: "Forgot Password",
    icon: "ni ni-key-25 text-info",
    component: <ForgotPassword />,
    layout: "/auth",
    viewOnSidebar: false,
  },
];
