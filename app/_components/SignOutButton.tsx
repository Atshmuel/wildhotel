import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOutAction } from '../_lib/actions';
import { Dispatch, SetStateAction } from 'react';

function SignOutButton({ setOpen, type }: { setOpen?: Dispatch<SetStateAction<boolean>>, type?: string }) {
  const handleSubmit = () => {
    signOutAction()
    setOpen?.((open) => !open)
  }

  return (
    <form action={type === 'nav' ? handleSubmit : signOutAction}>

      {type === 'nav' ? <li className="mb-10">
        <button

          className="hover:text-accent-400 rounded-sm border-2 p-2 hover:border-accent-400 transition-colors w-full"

        >
          Sign out
        </button>
      </li> :

        <button className='py-2 px-1 h-full  md:py-3 md:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full flex-col md:flex-row text-center'>
          <ArrowRightOnRectangleIcon className='h-5 w-5 text-primary-600' />
          <span className='text-xs md:text-lg mx-auto'>Sign out</span>
        </button>
      }

    </form>





  );
}

export default SignOutButton;
