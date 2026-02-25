"use client";

import { useWallet } from "@/lib/wallet";
import { Button } from "@/components/ui/button";

export function WalletButton() {
    const { address, connect, disconnect, status } = useWallet();

    if (address) {
        return (
            <Button variant="outline" onClick={disconnect} className="font-mono text-[11px] uppercase tracking-wider">
                {address.slice(0, 6)}...{address.slice(-4)}
            </Button>
        );
    }

    return (
        <Button onClick={connect} className="text-[11px] uppercase tracking-wider">
            {status === "connecting" ? "Connecting..." : "Connect"}
        </Button>
    );
}
