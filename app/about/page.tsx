import Image from "next/image";
import Link from "next/link";

import image1 from '@/public/about-2.webp'
import image2 from '@/public/about-1.webp'
import { getCabinsData } from "@/app/_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabinsData()
  return (
    <div className="grid grid-cols-3 gap-y-10 md:grid-cols-5 md:gap-x-24 md:gap-y-32 md:text-md items-center">
      <div className="col-span-3">
        <h1 className="text-2xl md:text-4xl mb-7 md:mb-10 text-accent-400 font-medium">
          Welcome to The Galilee Charm
        </h1>

        <div className="space-y-4 md:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Galilee, this is your
            paradise away from home. But it&apos;s not just about the luxury rooms.
            It&apos;s about the experience of reconnecting with nature and enjoying
            simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury type of rooms provide a cozy base, but the real freedom and
            peace you&apos;ll find in the surrounding mountains. Wander through lush
            forests, breathe in the fresh air, and watch the stars twinkle above
            from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by nature&apos;s
            splendor. It&apos;s a place to slow down, relax, and feel the joy of
            being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="col-span-3 sm:col-span-1 sm:translate-x-0 md:col-span-2 md:translate-x-0">
        <Image
          src={image1}
          quality={80}
          placeholder='blur'
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      <div className="col-span-3 sm:col-span-1 sm:translate-x-full md:col-span-2 md:translate-x-0">
        <Image src={image2} quality={80} placeholder="blur" alt="Family that manages The Galilee Charm" />
      </div>

      <div className="col-span-3">

        <h1 className="text-2xl md:text-4xl mb-7 md:mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-4 md:space-y-8">
          <p>
            Since 1962, The Galilee Charm has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Galilee Charm,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The Galilee Charm soon, where tradition meets tranquility, and every visit is
            like coming home.
          </p>

          <div>
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-3 py-3 md:px-7 md:py-5 text-primary-800 text-sm md:text-lg font-semibold hover:bg-accent-600"
            >
              Explore our luxury rooms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}