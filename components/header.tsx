"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { WalletButton } from "@/components/wallet-button";

const nav = [
    { href: "/explorer", label: "EXPLORER" },
    { href: "/register", label: "REGISTER" },
    { href: "/dashboard", label: "DASHBOARD" },
    { href: "/tools", label: "TOOLS" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70 active:opacity-50">
                    <div className="flex h-8 w-8 items-center justify-center border border-accent bg-accent/10 text-xs font-bold tracking-tighter text-accent">
                        ARC
                    </div>
                    <div className="leading-tight">
                        <div className="text-xs font-semibold uppercase tracking-widest text-foreground">Arc ID</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Identity Layer</div>
                    </div>
                </Link>

                <nav className="hidden items-center gap-0.5 md:flex">
                    {nav.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-3 py-1.5 text-[11px] uppercase tracking-wider transition-colors",
                                    active
                                        ? "text-accent"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {active && (
                                    <span className="absolute bottom-0 left-3 right-3 h-px bg-accent" />
                                )}
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
