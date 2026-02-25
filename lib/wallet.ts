"use client";

import { useCallback, useState } from "react";

type WalletStatus = "idle" | "connecting" | "connected";

export function useWallet() {
    const [address, setAddress] = useState<string | null>(null);
    const [status, setStatus] = useState<WalletStatus>("idle");

    const connect = useCallback(async () => {
        setStatus("connecting");

        // TODO: заменить на реальный коннект.
        // Например wagmi + injected connector.
        await new Promise((r) => setTimeout(r, 500));
        setAddress("0x7E57...DEMO...8004".replace("...", "")); // нарочно “фейк”
        setStatus("connected");
    }, []);

    const disconnect = useCallback(() => {
        setAddress(null);
        setStatus("idle");
    }, []);

    return { address, status, connect, disconnect };
}
