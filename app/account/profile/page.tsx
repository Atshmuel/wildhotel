import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

import NotFound from "@/app/not-found";

export const metadata = {
    title: "Update profile",
};

export default async function Page() {
    const session = await auth()
    if (!session || !session?.user) return NotFound()

    const guest = await getGuest(session?.user.email)

    return (
        <div>
            <h2 className="font-semibold text-xl md:text-2xl text-accent-400 mb-4">
                Update your guest profile
            </h2>

            <p className="text-sm md:text-lg mb-4 md:mb-8 text-primary-200">
                Providing the following information will make your check-in process
                faster and smoother. See you soon!
            </p>

            <UpdateProfileForm guest={guest}>
                <SelectCountry
                    name="nationality"
                    id="nationality"
                    defaultCountry={guest?.nationality}
                    className="md:px-5 px-2 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                />
            </UpdateProfileForm>

        </div>
    );
}
