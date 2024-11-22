'use client'
import { useTransition } from "react";
import { signInAction } from "../_lib/actions";

function SignInButton({ redirectTo }: { redirectTo?: string }) {
  const [isPending, startTransition] = useTransition()

  const handleSignIn = () => {
    startTransition(() => {
      signInAction(redirectTo)
    })

  }

  return (
    <form action={handleSignIn}>
      <button disabled={isPending} className='flex items-center gap-6 text-base px-6 py-3 md:text-lg border border-primary-300 md:px-10 md:py-4 font-medium'>
        <img
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>{isPending ? "Logging in..." : "Continue with Google"}</span>
      </button>
    </form>
  );
}

export default SignInButton;
