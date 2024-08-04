import { Inter } from "next/font/google";
import "./globals.css";

import Navigation from "../components/Navigation";

const inter = Inter({ subsets: ["latin"] });

// const localizations = {
//   signIn: {
//     start: {
//       actionText: "",
//       title: "Для продолжения нужно авторизоваться",
//       actionLink: "",
//       subtitle: "Для продолжения авторизуйтесь",
//     },
//     formButtonPrimary: "Продолжить",
//   },
// };
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-screen h-screen  flex flex-row relative">
        <Navigation />

        {/* <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Navbar />
      </div> */}

        <div className="flex w-screen h-screen bg-neutral-800/20 pl-16">{children}</div>
      </main>
    </>
  );
}
