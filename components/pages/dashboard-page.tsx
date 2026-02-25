"use client";

import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@/lib/wallet";
import { getByOwner } from "@/lib/registry";
import { AgentPassport, AgentTool } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ToolTile({ tool, ownerMode }: { tool: AgentTool; ownerMode: boolean }) {
    const locked = tool.requiresOwner && !ownerMode;
    return (
        <div className="border border-border p-4 transition-colors hover:bg-secondary">
            <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-foreground">{tool.name}</div>
                {locked ? (
                    <Badge variant="secondary" className="text-[9px] uppercase">
                        owner only
                    </Badge>
                ) : (
                    <Badge variant="outline" className="text-[9px] uppercase">
                        available
                    </Badge>
                )}
            </div>
            {tool.description && (
                <div className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{tool.description}</div>
            )}
            <div className="mt-3">
                <Button disabled={locked} className="w-full text-[10px] uppercase tracking-wider">
                    Execute
                </Button>
            </div>
        </div>
    );
}

export function DashboardPage() {
    const { address } = useWallet();
    const [myAgents, setMyAgents] = useState<AgentPassport[]>([]);
    const [selected, setSelected] = useState<AgentPassport | null>(null);

    useEffect(() => {
        (async () => {
            if (!address) {
                setMyAgents([]);
                setSelected(null);
                return;
            }
            const res = await getByOwner(address);
            setMyAgents(res);
            setSelected(res[0] ?? null);
        })();
    }, [address]);

    const ownerMode = useMemo(() => !!address, [address]);

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <span className="inline-block h-px w-6 bg-accent" />
                    <span className="text-[10px] uppercase tracking-widest text-accent">Control Panel</span>
                </div>
                <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">
                    Dashboard
                </h1>
                <p className="max-w-lg text-xs leading-relaxed text-muted-foreground">
                    Connect wallet to manage agents you own (based on passport owner field).
                </p>
            </div>

            {!address ? (
                <div className="border border-border">
                    <div className="border-b border-border p-4">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Status: disconnected</div>
                    </div>
                    <div className="p-4">
                        <div className="border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                            Connect your wallet in the top right. Owner-only tools remain locked.
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Agent list */}
                    <div className="border border-border md:col-span-1">
                        <div className="border-b border-border p-4">
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">My Agents</div>
                            <div className="mt-1 truncate font-mono text-[10px] text-muted-foreground">owner: {address}</div>
                        </div>
                        <div className="space-y-px p-2">
                            {myAgents.length === 0 ? (
                                <div className="border border-dashed border-border p-5 text-xs text-muted-foreground">
                                    No agents found for this owner. Go to Register for onboarding.
                                </div>
                            ) : (
                                myAgents.map((a) => (
                                    <button
                                        key={a.agentId}
                                        onClick={() => setSelected(a)}
                                        className={cn(
                                            "w-full border border-border p-3 text-left transition-colors",
                                            selected?.agentId === a.agentId
                                                ? "bg-secondary border-accent/30"
                                                : "hover:bg-secondary/50"
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
                                                {a.name}
                                            </span>
                                            <Badge variant="outline" className="text-[9px] uppercase">
                                                {a.status}
                                            </Badge>
                                        </div>
                                        <div className="mt-1 truncate font-mono text-[10px] text-muted-foreground">
                                            {a.agentId}
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {a.tags.slice(0, 3).map((t) => (
                                                <Badge key={t} variant="secondary" className="text-[9px] uppercase">
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Agent tools */}
                    <div className="border border-border md:col-span-2">
                        <div className="border-b border-border p-4">
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Agent Tools</div>
                            <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                                {selected ? (
                                    <>
                                        {selected.name} / {selected.agentId}
                                    </>
                                ) : (
                                    "Select an agent to view tools"
                                )}
                            </div>
                        </div>
                        <div className="space-y-4 p-4">
                            {!selected ? (
                                <div className="border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                                    SELECT AN AGENT FROM THE LEFT PANEL.
                                </div>
                            ) : (
                                <>
                                    {/* Passport info */}
                                    <div className="border border-border p-4">
                                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                                            Passport
                                        </div>
                                        <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-2">
                                            <div className="text-muted-foreground">Owner</div>
                                            <div className="break-all font-mono text-[10px] text-foreground">
                                                {selected.owner}
                                            </div>
                                            <div className="text-muted-foreground">Endpoints</div>
                                            <div className="break-all font-mono text-[10px] text-foreground">
                                                {selected.endpoints?.mcp ?? "--"}{" "}
                                                {selected.endpoints?.http ? ` / ${selected.endpoints.http}` : ""}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tools grid */}
                                    <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
                                        {selected.tools.map((tool) => (
                                            <ToolTile key={tool.id} tool={tool} ownerMode={ownerMode} />
                                        ))}
                                    </div>

                                    <div className="border border-border bg-secondary p-4 text-[10px] text-muted-foreground">
                                        Plug real logic here: MCP calls, signatures, proxying, rate limits, audit logs.
                                        The UI is owner-ready.
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
