import Link from "next/link";
import { auth } from '../_lib/auth'
export default async function Navigation() {
  const session = await auth()

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
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
              <img src={session.user.image ?? ""} alt={session.user.name ?? ""} referrerPolicy="no-referrer" className="rounded-full h-8" />
              <span>
                {session.user.name?.split(" ").at(0)}&apos;s area
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
    </nav>
  );
}
