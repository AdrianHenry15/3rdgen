import Profile from "@/components/layout/user/profile/profile";

export default function ProfilePage() {
    return (
        <section className="flex h-full w-full justify-center bg-black">
            <div className="text-white flex items-start w-full h-full">
                <Profile />
            </div>
        </section>
    );
}
