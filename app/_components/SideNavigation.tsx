"use client"
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className='h-5 w-5 text-primary-600' />,
  },
];

function SideNavigation() {
  const pathName = usePathname()

  return (
    <nav className='md:border-r border-primary-900 w-full'>
      <ul className='flex flex-row justify-around md:flex-col h-full text-lg'>
        {navLinks.map((link) => (
          <li key={link.name} >
            <Link
              className={`py-2 px-4 md:py-3 md:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full flex-col md:flex-row text-center  ${pathName === link.href && 'bg-primary-900'}`}
              href={link.href}
            >
              {link.icon}
              <span className='text-xs md:text-lg'>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className='hidden md:block mt-auto'>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
