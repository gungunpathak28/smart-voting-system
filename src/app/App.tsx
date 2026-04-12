import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";

// 🔥 GitHub Pages redirect fix
const redirect = sessionStorage.getItem("redirect");
if (redirect) {
  sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", redirect);
}

export default function App() {

  // 🔥 test API call (check backend working)
  useEffect(() => {
    fetch("http://localhost:5000/results")
      .then(res => res.json())
      .then(data => console.log("Backend data:", data))
      .catch(err => console.log("Error:", err));
  }, []);

  return <RouterProvider router={router} />;
}