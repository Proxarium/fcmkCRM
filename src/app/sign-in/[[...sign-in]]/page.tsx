// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="h-[calc(100vh-96px)] flex items-center justify-center">
//       <SignIn
//         appearance={{
//           elements: {
//             formButtonPrimary: "bg-blue-500 hover:bg-blue-700 text-sm",
//           },
//         }}
//       />
//     </div>
//   );
// }

"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/20 sm:w-96 sm:px-8"
        >
          <header className="flex flex-col items-center text-center">
            <Image alt="logoauth" src="/csaLogo.png" width={190} height={100} />
            <h1 className="mt-4 text-xl font-medium tracking-tight text-customblue">
              Центр санитарной авиации
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-4">
            <Clerk.Field name="identifier" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-customblue">
                Электронная почта
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm  font-medium text-customblue">
                Пароль
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignIn.Action
            submit
            className="w-full rounded-md bg-blue-500 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-black/50 hover:bg-blue-600 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-800 active:text-white/70"
          >
            Войти
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
