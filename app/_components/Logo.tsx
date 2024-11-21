import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        height={50}
        width={50}
        quality={100}
        alt="The Galilee Charm logo"
      />
      <span className=" [text-shadow:_1px_1px_2px_rgb(0_0_0/_0.8)]  md:text-lg lg:text-xl font-semibold text-primary-100">
        The Galilee Charm
      </span>
    </Link>
  );
}

export default Logo;
