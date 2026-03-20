import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function AuthHeader() {
  return (
    <div className="absolute top-6 right-6 z-50">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-full shadow-lg hover:bg-slate-800 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 border border-transparent">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="bg-white p-1 rounded-full shadow-md border border-slate-200">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </div>
  );
}
