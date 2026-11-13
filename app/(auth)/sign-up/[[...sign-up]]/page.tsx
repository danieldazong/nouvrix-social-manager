// This file defines the sign-up page for the application. It uses the SignUp component from Clerk to handle user authentication.
// The SignUp component is used to allow users to create a new account.
// The SignUp component is provided by Clerk,
// which is a third-party authentication service that simplifies the process of adding authentication to web applications.

import { SignUp } from "@clerk/nextjs";
// The Suspense component is used to handle the loading state of the SignUp component.
// The fallback prop is used to specify what should be rendered while the SignUp component is being loaded.
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Suspense fallback={<div className="text-white">Loading security module...</div>}>
        <SignUp />
      </Suspense>
    </div>
  );
}