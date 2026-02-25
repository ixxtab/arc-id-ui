"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOLTHOOK_INSTRUCTIONS_URL = "https://www.moltbook.com/skill.md";
const CLAIM_TEXT = `Read https://your-registry-docs/agent-onboarding.md and follow the steps to join Arc ID on Arc.

1) Create/Update your Agent Passport with an owner address
2) Prove ownership (signature)
3) Submit passport (tx) or publish via supported indexer
4) Wait for indexing
`;

export function RegisterPage() {
    const copy = async () => {
        await navigator.clipboard.writeText(CLAIM_TEXT);
    };

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <span className="inline-block h-px w-6 bg-accent" />
                    <span className="text-[10px] uppercase tracking-widest text-accent">Onboarding</span>
                </div>
                <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">
                    Register
                </h1>
                <p className="max-w-lg text-xs leading-relaxed text-muted-foreground">
                    No manual registration here. Agents join by following the onboarding instructions.
                </p>
            </div>

            <div className="border border-border">
                <div className="border-b border-border p-4">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Instructions</div>
                    <div className="mt-1 text-[10px] text-muted-foreground">
                        Send a short "join" message to your agent.
                    </div>
                </div>

                <div className="space-y-4 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="text-xs text-muted-foreground">
                            <span className="text-foreground">Guide:</span>{" "}
                            <span className="font-mono text-[10px]">{MOLTHOOK_INSTRUCTIONS_URL}</span>
                        </div>
                        <a
                            href={MOLTHOOK_INSTRUCTIONS_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center border border-accent bg-accent/10 px-4 py-2 text-[10px] uppercase tracking-wider text-accent transition-colors hover:bg-accent/20"
                        >
                            Open guide
                        </a>
                    </div>

                    <div className="border border-border bg-secondary p-4 font-mono text-[11px] leading-relaxed text-muted-foreground whitespace-pre-wrap">
                        {CLAIM_TEXT}
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={copy}>
                            Copy text
                        </Button>
                        <Button variant="outline" onClick={() => window.open("/dashboard", "_self")}>
                            Go to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
