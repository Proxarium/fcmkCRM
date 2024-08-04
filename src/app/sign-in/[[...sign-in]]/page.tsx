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
    <div className="relative flex items-center justify-center h-screen px-10 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-mobile pt-20">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          // className="w-full flex-grow space-y-6 rounded-2xl bg-neutral-900 bg-[radial-gradient(circle_at_50%_0%,theme(colors.white/10%),transparent)] px-4 py-10 ring-1 ring-inset ring-white/5 sm:w-96 sm:px-8"
           className="w-full flex-grow space-y-6 rounded-2xl px-4 py-10 ring-1 ring-inset ring-white/5 sm:w-96 sm:px-8"
        >
          {/* <header className="flex flex-col items-center text-center">
            <Image priority alt="logoauth" src="/csaLogo.png" width={240} height={65} />
            <h1 className="mb-8 text-xl font-mono tracking-tight text-white">
              Центр санитарной авиации
            </h1>
          </header> */}
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-6">
          <Clerk.Field name="identifier" className="group/field relative">
            <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-transparent pb-4 px-2 font-mono text-xs/4 text-white before:absolute before:inset-0 before:-z-10 before:bg-transparent group-focus-within/field:text-emerald-300 group-data-[invalid]/field:text-rose-400">
              Email address
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-emerald-500/20 focus:ring-[1.5px] focus:ring-emerald-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400"
            />
            <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="group/field relative">
            <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-transparent pb-4 px-2 font-mono text-xs/4 text-white before:absolute before:inset-0 before:-z-10 before:bg-transparent group-focus-within/field:text-emerald-300 group-data-[invalid]/field:text-rose-400">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-emerald-500/20 focus:ring-[1.5px] focus:ring-emerald-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400"
            />
            <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
          </Clerk.Field>
          </div>
          <SignIn.Action
            submit
            className="relative px-4 py-2 bg-blue-500 text-white text-xs rounded-md flex items-center justify-center w-full"
          >
            Войти
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}




