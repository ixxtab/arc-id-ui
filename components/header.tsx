"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { WalletButton } from "@/components/wallet-button";

const nav = [
    { href: "/explorer", label: "Explorer" },
    { href: "/register", label: "Register" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tools", label: "Tools" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all active:scale-95">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 font-semibold text-primary">
                        8
                    </div>
                    <div className="leading-tight">
                        <div className="text-sm font-semibold">Arc ID</div>
                        <div className="text-xs text-muted-foreground">The Identity Layer for Autonomous Agents</div>
                    </div>
                </Link>

                <nav className="hidden items-center gap-2 md:flex">
                    {nav.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "rounded-xl px-3 py-2 text-sm transition",
                                    active ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted/60"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <WalletButton />
                </div>
            </div>
        </header>
    );
}
