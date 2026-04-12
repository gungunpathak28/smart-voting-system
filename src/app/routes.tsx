import { createBrowserRouter } from "react-router";
import LoginScreen from "./screens/LoginScreen";
import VotingScreen from "./screens/VotingScreen";
import AdminDashboard from "./screens/AdminDashboard";
import AnomalyDetection from "./screens/AnomalyDetection";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen,
  },
  {
    path: "/vote",
    Component: VotingScreen,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/anomalies",
    Component: AnomalyDetection,
  },
]);
