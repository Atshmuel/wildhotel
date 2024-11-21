'use client'
import Link from "next/link";
import { Session } from "next-auth";
import { useState } from "react";
import SignOutButton from "./SignOutButton";
export default function Navigation({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="z-50 text-lg md:relative md:text-xl">
      <ul className="hidden [text-shadow:_2px_2px_4px_rgb(0_0_0/_0.8)]  gap-10 md:flex lg:gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {
            session?.user ? <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-3"
            >
              <img src={session?.user?.image ?? ""} alt={session?.user?.name ?? ""} referrerPolicy="no-referrer" className="rounded-full h-8" />
              <span>
                {session?.user.name?.split(" ").at(0)}&apos;s area
              </span>
            </Link> : <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          }
        </li>

      </ul>
      <div onClick={() => setIsOpen(!isOpen)} className=" cursor-pointer md:hidden size-10 flex flex-col gap-2 justify-center items-center group ">
        <span className="inline-block w-10/12 h-[0.2rem] bg-primary-100 group-hover:bg-accent-400  transition-colors duration-150 rounded-full"></span>
        <span className="inline-block w-7/12 h-[0.2rem] self-end mr-1 bg-primary-100 group-hover:bg-accent-400  transition-colors duration-150 rounded-full"></span>
        <span className="inline-block w-10/12 h-[0.2rem] bg-primary-100 group-hover:bg-accent-400  transition-colors duration-150 rounded-full"></span>
      </div>

      {isOpen &&
        <div onClick={(e) => e.target === e.currentTarget && setIsOpen(!isOpen)} className="md:hidden w-full h-full fixed left-0 top-0 flex justify-end backdrop-blur-sm">
          <ul className="h-full w-3/5 sm:w-2/5 flex flex-col bg-primary-900 text-center p-10 pt-24 overflow-hidden animate-slideInRight">
            <li className={`mb-10`}>
              <Link
                href="/cabins"
                className="hover:text-accent-400 transition-colors w-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                Cabins
              </Link>
            </li>
            <li className="mb-10">
              <Link
                href="/about"
                className="hover:text-accent-400 transition-colors w-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                About
              </Link>
            </li>
            <li className="mb-10">
              {
                session?.user ? <Link
                  href="/account"
                  className="hover:text-accent-400 transition-colors w-full flex text-center justify-center items-center gap-3"
                  onClick={() => setIsOpen(!isOpen)}

                >
                  <img src={session?.user?.image ?? ""} alt={session?.user?.name ?? ""} referrerPolicy="no-referrer" className="rounded-full h-8" />
                  <span>
                    {session?.user.name?.split(" ").at(0)}&apos;s area
                  </span>
                </Link> : <Link
                  href="/account"
                  className="hover:text-accent-400 transition-colors w-full"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Guest area
                </Link>
              }
            </li>

            {session?.user ? <div className="mt-auto" >
              <SignOutButton setOpen={setIsOpen} type="nav" />
            </div> : null}
          </ul>

        </div>

      }

    </nav >
  );
}
