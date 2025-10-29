"use client";

import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  // Default responsive sizing: mobile (h-8) → sm (h-10) → md (h-12) → lg (h-14)
  const defaultSizing = "h-8 sm:h-10 md:h-12 lg:h-14 w-auto";
  const appliedClassName = className || defaultSizing;

  return (
    <div className={appliedClassName}>
      {/* Light mode logo */}
      <Image
        src="/logo.png"
        alt="Melco Logo"
        width={160}
        height={56}
        className="block dark:hidden w-full h-full object-contain"
        priority
        suppressHydrationWarning
      />
      {/* Dark mode logo */}
      <Image
        src="/logo-white.png"
        alt="Melco Logo"
        width={160}
        height={56}
        className="hidden dark:block w-full h-full object-contain"
        priority
        suppressHydrationWarning
      />
    </div>
  );
}
