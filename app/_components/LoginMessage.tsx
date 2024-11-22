import Link from "next/link";
import SignInButton from "./SignInButton";

function LoginMessage({ redirectTo }: { redirectTo?: string }) {
  return (
    <div className='grid bg-primary-800 justify-center py-5 md:py-0'>
      <p className='text-center text-base md:text-xl py-10 self-center'>
        Please{' '}

        login
        to reserve this
        <br /> cabin right now
      </p>
      <SignInButton redirectTo={redirectTo} />
    </div>
  );
}

export default LoginMessage;
