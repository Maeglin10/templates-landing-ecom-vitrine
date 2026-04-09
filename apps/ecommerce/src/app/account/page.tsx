import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <div className="container mx-auto py-12 flex justify-center">
      <UserProfile />
    </div>
  );
}
