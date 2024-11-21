import { redirect } from "next/navigation";
import SignInButton from "../_components/SignInButton";
import { auth } from "../_lib/auth";



export default async function Page() {
  const session = await auth()
  if (session?.user) redirect('/account')

  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl text-center font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}


