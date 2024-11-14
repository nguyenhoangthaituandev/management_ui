import React from "react";
import { lazy } from "@loadable/component";

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import DocLayout from "./layouts/Doc";

// Guards
import Auth from "./hoc/Auth";
import AdminAuth from "./hoc/AdminAuth";
import AdminOrManagerAuth from "./hoc/AdminOrManagerAuth";


// Dashboards
const Default = lazy(() => import("./pages/dashboards/Default"));
const Analytics = lazy(() => import("./pages/dashboards/Analytics"));
const SaaS = lazy(() => import("./pages/dashboards/SaaS"));
const Social = lazy(() => import("./pages/dashboards/Social"));
const Crypto = lazy(() => import("./pages/dashboards/Crypto"));

// Pages
const Profile = lazy(() => import("./pages/pages/Profile"));
const Settings = lazy(() => import("./pages/pages/Settings"));
const Clients = lazy(() => import("./pages/pages/Clients"));
const Projects = lazy(() => import("./pages/pages/Projects"));
const Invoice = lazy(() => import("./pages/pages/Invoice"));
const Pricing = lazy(() => import("./pages/pages/Pricing"));
const Tasks = lazy(() => import("./pages/pages/Tasks"));
const Chat = lazy(() => import("./pages/pages/Chat"));
const Blank = lazy(() => import("./pages/pages/Blank"));
const HomePage = lazy(() => import("./pages/pages/Home"));
const DepartmentPage = lazy(() => import("./pages/departments/Department"));
const DetailDepartmentPage = lazy(() => import("./pages/departments/DetailDepartment"));
const DepartmentRoute = lazy(() => import("./pages/departments/DepartmentRoute"));
const AccountPage = lazy(() => import("./pages/accounts/Account"));
const GroupPage = lazy(() => import("./pages/groups/Group"));


// Auth
const Page500 = lazy(() => import("./pages/auth/Page500"));
const Page404 = lazy(() => import("./pages/auth/Page404"));
const Page403 = lazy(() => import("./pages/auth/Page403"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const SignUpNotification = lazy(() => import("./components/auth/SignUpNotification"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ForgotPasswordNotification = lazy(() => import("./components/auth/ForgotPasswordNotification"));
const NewPassword = lazy(() => import("./pages/auth/NewPassword"));
const ChangePassword = lazy(() => import("./pages/auth/ChangePassword"));

// UI components
const Alerts = lazy(() => import("./pages/ui/Alerts"));
const Buttons = lazy(() => import("./pages/ui/Buttons"));
const Cards = lazy(() => import("./pages/ui/Cards"));
const Carousel = lazy(() => import("./pages/ui/Carousel"));
const EmbedVideo = lazy(() => import("./pages/ui/EmbedVideo"));
const General = lazy(() => import("./pages/ui/General"));
const Grid = lazy(() => import("./pages/ui/Grid"));
const Modals = lazy(() => import("./pages/ui/Modals"));
const Offcanvas = lazy(() => import("./pages/ui/Offcanvas"));
const Tabs = lazy(() => import("./pages/ui/Tabs"));
const Typography = lazy(() => import("./pages/ui/Typography"));

// Icons
const Feather = lazy(() => import("./pages/icons/Feather"));
const FontAwesome = lazy(() => import("./pages/icons/FontAwesome"));

// Forms
const Layouts = lazy(() => import("./pages/forms/Layouts"));
const BasicInputs = lazy(() => import("./pages/forms/BasicInputs"));
const InputGroups = lazy(() => import("./pages/forms/InputGroups"));
const FloatingLabels = lazy(() => import("./pages/forms/FloatingLabels"));
const AdvancedInputs = lazy(() => import("./pages/forms/AdvancedInputs"));
const Formik = lazy(() => import("./pages/forms/Formik"));
const Editors = lazy(() => import("./pages/forms/Editors"));

// Tables
const Tables = lazy(() => import("./pages/tables/Tables"));
const Pagination = lazy(() => import("./pages/tables/Pagination"));
const ColumnSorting = lazy(() => import("./pages/tables/ColumnSorting"));
const ColumnFiltering = lazy(() => import("./pages/tables/ColumnFiltering"));
const RowExpanding = lazy(() => import("./pages/tables/RowExpanding"));
const RowSelection = lazy(() => import("./pages/tables/RowSelection"));

// Charts
const Chartjs = lazy(() => import("./pages/charts/Chartjs"));
const ApexCharts = lazy(() => import("./pages/charts/ApexCharts"));

// Notifications
const Notifications = lazy(() => import("./pages/notifications/Notifications"));

// Maps
const GoogleMaps = lazy(() => import("./pages/maps/GoogleMaps"));
const VectorMaps = lazy(() => import("./pages/maps/VectorMaps"));

// Calendar
const Calendar = lazy(() => import("./pages/calendar/Calendar"));

// Documentation
const Introduction = lazy(() => import("./pages/docs/Introduction"));
const GettingStarted = lazy(() => import("./pages/docs/GettingStarted"));
const Routing = lazy(() => import("./pages/docs/Routing"));
const Guards = lazy(() => import("./pages/docs/Guards"));


const Internationalization = lazy(() =>
  import("./pages/docs/Internationalization")
);
const EnvironmentVariables = lazy(() =>
  import("./pages/docs/EnvironmentVariables")
);
const ESLintAndPrettier = lazy(() => import("./pages/docs/ESLintAndPrettier"));
const Deployment = lazy(() => import("./pages/docs/Deployment"));
const MigratingToNextJS = lazy(() => import("./pages/docs/MigratingToNextJS"));
const Support = lazy(() => import("./pages/docs/Support"));
const Changelog = lazy(() => import("./pages/docs/Changelog"));

// Protected routes
const ProtectedPage = lazy(() => import("./pages/protected/ProtectedPage"));

const routes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/departments",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (
          <AdminOrManagerAuth>
            <DepartmentRoute />
          </AdminOrManagerAuth>
        ),
      },
      {
        path: ":id",
        element: (
          <AdminOrManagerAuth>
            <DetailDepartmentPage />
          </AdminOrManagerAuth>
        ),
      }
    ],
  },
  {
    path: "/accounts",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <AccountPage />,
      },
    ],
  },
  {
    path: "/groups",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <GroupPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "default",
        element: <Default />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "saas",
        element: <SaaS />,
      },
      {
        path: "social",
        element: <Social />,
      },
      {
        path: "crypto",
        element: <Crypto />,
      },
    ],
  },
  {
    path: "pages",
    element: <DashboardLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "blank",
        element: <Blank />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "sign-up-notification",
        element: <SignUpNotification />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "forgot-password-notification",
        element: <ForgotPasswordNotification />,
      },
      {
        path: "new-password",
        element: <NewPassword />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "403",
        element: <Page403 />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
    ],
  },
  {
    path: "ui",
    element: <DashboardLayout />,
    children: [
      {
        path: "alerts",
        element: <Alerts />,
      },
      {
        path: "buttons",
        element: <Buttons />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "carousel",
        element: <Carousel />,
      },
      {
        path: "embed-video",
        element: <EmbedVideo />,
      },
      {
        path: "general",
        element: <General />,
      },
      {
        path: "grid",
        element: <Grid />,
      },
      {
        path: "modals",
        element: <Modals />,
      },
      {
        path: "tabs",
        element: <Tabs />,
      },
      {
        path: "offcanvas",
        element: <Offcanvas />,
      },
      {
        path: "typography",
        element: <Typography />,
      },
    ],
  },
  {
    path: "icons",
    element: <DashboardLayout />,
    children: [
      {
        path: "feather",
        element: <Feather />,
      },
      {
        path: "font-awesome",
        element: <FontAwesome />,
      },
    ],
  },
  {
    path: "forms",
    element: <DashboardLayout />,
    children: [
      {
        path: "layouts",
        element: <Layouts />,
      },
      {
        path: "basic-inputs",
        element: <BasicInputs />,
      },
      {
        path: "input-groups",
        element: <InputGroups />,
      },
      {
        path: "floating-labels",
        element: <FloatingLabels />,
      },
    ],
  },
  {
    path: "tables",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Tables />,
      },
    ],
  },
  {
    path: "form-plugins",
    element: <DashboardLayout />,
    children: [
      {
        path: "advanced-inputs",
        element: <AdvancedInputs />,
      },
      {
        path: "formik",
        element: <Formik />,
      },
      {
        path: "editors",
        element: <Editors />,
      },
    ],
  },
  {
    path: "advanced-tables",
    element: <DashboardLayout />,
    children: [
      {
        path: "pagination",
        element: <Pagination />,
      },
      {
        path: "column-sorting",
        element: <ColumnSorting />,
      },
      {
        path: "column-filtering",
        element: <ColumnFiltering />,
      },
      {
        path: "row-expanding",
        element: <RowExpanding />,
      },
      {
        path: "row-selection",
        element: <RowSelection />,
      },
    ],
  },
  {
    path: "charts",
    element: <DashboardLayout />,
    children: [
      {
        path: "chartjs",
        element: <Chartjs />,
      },
      {
        path: "apexcharts",
        element: <ApexCharts />,
      },
    ],
  },
  {
    path: "notifications",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "maps",
    element: <DashboardLayout />,
    children: [
      {
        path: "google-maps",
        element: <GoogleMaps />,
      },
      {
        path: "vector-maps",
        element: <VectorMaps />,
      },
    ],
  },
  {
    path: "calendar",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Calendar />,
      },
    ],
  },
  {
    path: "docs",
    element: <DocLayout />,
    children: [
      {
        path: "introduction",
        element: <Introduction />,
      },
      {
        path: "getting-started",
        element: <GettingStarted />,
      },
      {
        path: "routing",
        element: <Routing />,
      },
      {
        path: "guards",
        element: <Guards />,
      },
      {
        path: "internationalization",
        element: <Internationalization />,
      },
      {
        path: "environment-variables",
        element: <EnvironmentVariables />,
      },
      {
        path: "eslint-and-prettier",
        element: <ESLintAndPrettier />,
      },
      {
        path: "deployment",
        element: <Deployment />,
      },
      {
        path: "migrating-to-next-js",
        element: <MigratingToNextJS />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "changelog",
        element: <Changelog />,
      },
    ],
  },
  {
    path: "private",
    element: (
      <DashboardLayout />
    ),
    children: [
      {
        path: "",
        element: <ProtectedPage />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
