// This file defines the sign-in page for the application. It uses the SignIn component from Clerk to handle user authentication.
// The SignIn component is used to allow users to log in to their account.
// The SignIn component is provided by Clerk,
// which is a third-party authentication service that simplifies the process of adding authentication to web applications.

import { SignIn } from "@clerk/nextjs";
// The Suspense component is used to handle the loading state of the SignIn component.
// The fallback prop is used to specify what should be rendered while the SignIn component is being loaded.
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Suspense fallback={<div className="text-white">Loading security module...</div>}>
        <SignIn />
      </Suspense>
    </div>
  );
}