import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.jpg";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 mx-auto text-center">
        <div className="relative size-[21rem] md:size-[35rem] mx-auto">
          <svg className="w-full h-full animate-spinSlow " viewBox="0 0 200 200">
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
              />
            </defs>
            <text
              className="text-lg md:text-xl text-primary-50  [text-shadow:_2px_2px_4px_rgb(0_0_0/_0.8)] font-normal"
              fill="currentColor"
            >
              <textPath href="#circlePath" textLength="420">
                Welcome to paradise.
              </textPath>
            </text>
          </svg>

          <Link
            href="/cabins"
            className="absolute inset-0 m-auto w-max h-max bg-accent-500 px-3 py-3 md:px-7 md:py-5 text-primary-800 text-sm md:text-lg font-semibold hover:bg-accent-600"
          >
            Explore luxury cabins
          </Link>
        </div>
      </div>
    </main>
  );
}