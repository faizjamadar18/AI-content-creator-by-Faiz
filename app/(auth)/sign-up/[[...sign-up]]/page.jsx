"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="mt-20">
            <div className="w-full max-w-sm">
                <SignUp />
            </div>
        </div>
    );
}