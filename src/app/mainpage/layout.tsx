// import { Inter } from "next/font/google";
// import "./globals.css";

// import Navigation from "../components/Navigation";

// const inter = Inter({ subsets: ["latin"] });

// // const localizations = {
// //   signIn: {
// //     start: {
// //       actionText: "",
// //       title: "Для продолжения нужно авторизоваться",
// //       actionLink: "",
// //       subtitle: "Для продолжения авторизуйтесь",
// //     },
// //     formButtonPrimary: "Продолжить",
// //   },
// // };
// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <main className="w-screen h-screen flex relative ">
//         <Navigation />

        

//         <div className="flex-grow  max-h-screen bg-neutral-800/20 pl-16">
//           {children}
//         </div>
//       </main>
//     </>
//   );
// }
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";


const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
      <main className="w-screen h-screen flex relative">
        <Navigation />
        
        <div className="flex-grow max-h-screen bg-neutral-800/20 pl-16">
          {children}
        </div>
      </main>
    
  );
}


