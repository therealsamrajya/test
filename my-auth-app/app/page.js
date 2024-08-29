import Image from "next/image";
import LoginPage from "./login/page";
import DashboardPage from "./dashboard/page";
import RegisterPage from "./register/page"

export default function Home() {
  return (
   <div>
    <LoginPage/>
    <DashboardPage/>
    <RegisterPage/>


   </div>
  );
}
