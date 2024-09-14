"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";

export default function RhfWithZod() {
  return (
    <section className="grid grid-cols-2 gap-6 h-full">
      <div className="flex flex-col items-center justify-center h-full mt-10">
        <h1 className="font-bold text-4xl mb-10">Sign In</h1>
        <GoogleButton onClick={() => signIn("google")} />
      </div>
      <Image
        src="/images/onboarding.png"
        alt="onboarding"
        height={500}
        width={400}
        className="w-full"
      />
    </section>
  );
}
