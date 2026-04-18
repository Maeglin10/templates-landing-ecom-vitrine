export const dynamic = 'force-dynamic';

const hasClerk = !!(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function AccountPage() {
  if (!hasClerk) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <div className="text-center p-10 border border-stone-200 dark:border-stone-700 rounded-2xl max-w-md">
          <h2 className="text-xl font-semibold mb-3">Account</h2>
          <p className="text-stone-500 text-sm">Authentication is not configured yet. Add your Clerk keys to enable user accounts.</p>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { UserProfile } = require('@clerk/nextjs');
  return (
    <div className="container mx-auto py-12 flex justify-center">
      <UserProfile />
    </div>
  );
}
