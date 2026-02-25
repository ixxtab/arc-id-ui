"use client";

import { useWallet } from "@/lib/wallet";
import { Button } from "@/components/ui/button";

export function WalletButton() {
    const { address, connect, disconnect, status } = useWallet();

    if (address) {
        return (
            <Button variant="secondary" onClick={disconnect} className="rounded-xl">
                {address.slice(0, 6)}…{address.slice(-4)}
            </Button>
        );
    }

    return (
        <Button onClick={connect} className="rounded-xl">
            {status === "connecting" ? "Connecting…" : "Connect Wallet"}
        </Button>
    );
}
