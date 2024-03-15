import EditProfile from "@/components/layout/user/account/edit-profile";

export default function EditProfilePage() {
    return (
        <section className="flex h-full w-full justify-center bg-black">
            <div className="text-white flex items-start w-full h-full">
                <EditProfile />
            </div>
        </section>
    );
}
