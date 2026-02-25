"use client";

import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@/lib/wallet";
import { getByOwner } from "@/lib/registry";
import { AgentPassport, AgentTool } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ToolTile({ tool, ownerMode }: { tool: AgentTool; ownerMode: boolean }) {
    const locked = tool.requiresOwner && !ownerMode;
    return (
        <div className="rounded-2xl border p-4">
            <div className="flex items-center justify-between gap-2">
                <div className="font-medium">{tool.name}</div>
                {locked ? (
                    <Badge variant="secondary" className="rounded-xl">
                        owner only
                    </Badge>
                ) : (
                    <Badge variant="outline" className="rounded-xl">
                        available
                    </Badge>
                )}
            </div>
            {tool.description ? <div className="mt-2 text-sm text-muted-foreground">{tool.description}</div> : null}
            <div className="mt-3">
                <Button disabled={locked} className="rounded-xl w-full">
                    Open tool
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
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="text-4xl font-semibold tracking-tight">Dashboard</div>
                <div className="text-sm text-muted-foreground">
                    Connect wallet to manage agents you own (based on passport owner field).
                </div>
            </div>

            {!address ? (
                <Card className="rounded-2xl">
                    <CardHeader className="pb-2">
                        <div className="text-sm font-medium">Not connected</div>
                        <div className="text-xs text-muted-foreground">
                            Connect your wallet in the top right. Then we’ll load your agents by owner address.
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
                            Owner-only tools are hidden/locked until you connect.
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="rounded-2xl md:col-span-1">
                        <CardHeader className="pb-2">
                            <div className="text-sm font-medium">My agents</div>
                            <div className="text-xs text-muted-foreground">owner: {address}</div>
                        </CardHeader>
                        <CardContent className="space-y-2 p-4">
                            {myAgents.length === 0 ? (
                                <div className="rounded-2xl border border-dashed p-5 text-sm text-muted-foreground">
                                    No agents found for this owner. Go to Register to see onboarding instructions.
                                </div>
                            ) : (
                                myAgents.map((a) => (
                                    <button
                                        key={a.agentId}
                                        onClick={() => setSelected(a)}
                                        className={cn(
                                            "w-full rounded-2xl border p-3 text-left transition",
                                            selected?.agentId === a.agentId ? "bg-muted" : "hover:bg-muted/50"
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="font-medium">{a.name}</div>
                                            <Badge variant="secondary" className="rounded-xl">
                                                {a.status}
                                            </Badge>
                                        </div>
                                        <div className="mt-1 truncate text-xs text-muted-foreground">{a.agentId}</div>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {a.tags.slice(0, 3).map((t) => (
                                                <Badge key={t} variant="outline" className="rounded-xl">
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </button>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl md:col-span-2">
                        <CardHeader className="pb-2">
                            <div className="text-sm font-medium">Agent tools</div>
                            <div className="text-xs text-muted-foreground">
                                {selected ? (
                                    <>
                                        {selected.name} · {selected.agentId}
                                    </>
                                ) : (
                                    "Select an agent to view tools"
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 p-4">
                            {!selected ? (
                                <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
                                    Pick an agent from the left panel.
                                </div>
                            ) : (
                                <>
                                    <div className="rounded-2xl border p-4">
                                        <div className="text-sm font-medium">Passport</div>
                                        <div className="mt-2 grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                                            <div className="text-muted-foreground">Owner</div>
                                            <div className="break-all font-mono text-xs">{selected.owner}</div>
                                            <div className="text-muted-foreground">Endpoints</div>
                                            <div className="break-all font-mono text-xs">
                                                {selected.endpoints?.mcp ?? "—"}{" "}
                                                {selected.endpoints?.http ? ` / ${selected.endpoints.http}` : ""}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        {selected.tools.map((tool) => (
                                            <ToolTile key={tool.id} tool={tool} ownerMode={ownerMode} />
                                        ))}
                                    </div>

                                    <div className="rounded-2xl border bg-muted/30 p-4 text-xs text-muted-foreground">
                                        Here you can plug real logic: MCP calls, signatures, proxying, rate limits, audit logs, etc.
                                        The UI is owner-ready.
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
