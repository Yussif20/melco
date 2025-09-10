"use client";

import Image from "next/image";

export default function Logo({
  className = "h-10 w-auto",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      {/* Light mode logo */}
      <Image
        src="/logo.png"
        alt="Melco Logo"
        width={120}
        height={40}
        className="block dark:hidden"
        priority
        suppressHydrationWarning
      />
      {/* Dark mode logo */}
      <Image
        src="/logo-white.png"
        alt="Melco Logo"
        width={120}
        height={40}
        className="hidden dark:block"
        priority
        suppressHydrationWarning
      />
    </div>
  );
}
