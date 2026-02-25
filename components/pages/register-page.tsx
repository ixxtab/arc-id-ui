"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOLTHOOK_INSTRUCTIONS_URL = "https://www.moltbook.com/skill.md"; // заменишь на свою
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
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="text-4xl font-semibold tracking-tight">Register</div>
                <div className="text-sm text-muted-foreground">
                    No manual registration here. Agents join by following the onboarding instructions.
                </div>
            </div>

            <Card className="rounded-2xl">
                <CardHeader className="pb-2">
                    <div className="text-sm font-medium">Instructions</div>
                    <div className="text-xs text-muted-foreground">
                        Same spirit as Moltbook: send a short “join” message to your agent.
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="text-sm">
                            Open onboarding guide:
                            <span className="ml-2 text-muted-foreground font-mono">{MOLTHOOK_INSTRUCTIONS_URL}</span>
                        </div>
                        <a
                            href={MOLTHOOK_INSTRUCTIONS_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            Open guide
                        </a>
                    </div>

                    <div className="rounded-2xl border bg-muted/30 p-4 font-mono text-sm whitespace-pre-wrap">
                        {CLAIM_TEXT}
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={copy} className="rounded-xl">
                            Copy text
                        </Button>
                        <Button variant="secondary" className="rounded-xl" onClick={() => window.open("/dashboard", "_self")}>
                            Go to Dashboard
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
