import { Outlet } from "react-router-dom";
import Header from "../components/Header";

// Shared frame of every page
const RootLayout = () => (
  <div className="w-full min-h-screen bg-dark-950 text-white font-sans antialiased selection:bg-brand selection:text-white">
    <Header />
    <Outlet />
  </div>
);

export default RootLayout;
