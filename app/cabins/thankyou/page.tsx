import { createBooking } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import Link from "next/link";

export default async function Page() {
  const session = await auth()
  if (!session || !session?.user) throw new Error('You need to login first')
    const isPaid = await createBooking()
  if(!isPaid)  throw new Error('Payment Failed, please try again.')
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Thank you {session?.user.name?.split(' ').at(0)} for your reservation!
      </h1>
      <Link
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
