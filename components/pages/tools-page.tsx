"use client";

import { useEffect, useMemo, useState } from "react";
import { searchRegistry } from "@/lib/registry";
import { AgentTool } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function ToolsPage() {
    const [tools, setTools] = useState<AgentTool[]>([]);

    useEffect(() => {
        (async () => {
            const agents = await searchRegistry({ status: "active" });
            const all = agents.flatMap((a) => a.tools.map((t) => ({ ...t, id: `${a.agentId}:${t.id}` })));
            setTools(all);
        })();
    }, []);

    const stats = useMemo(() => {
        const total = tools.length;
        const ownerOnly = tools.filter((t) => t.requiresOwner).length;
        return { total, ownerOnly };
    }, [tools]);

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <span className="inline-block h-px w-6 bg-accent" />
                    <span className="text-[10px] uppercase tracking-widest text-accent">Catalog</span>
                </div>
                <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">
                    Tools
                </h1>
                <p className="max-w-lg text-xs leading-relaxed text-muted-foreground">
                    Public catalog of declared tools across agents. Owner-only tools still require Dashboard access.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-border">
                <div className="bg-card p-4">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total tools</div>
                    <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">{stats.total}</div>
                </div>
                <div className="bg-card p-4">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Owner-only</div>
                    <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">{stats.ownerOnly}</div>
                </div>
            </div>

            {/* Tool list */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Tool list / {tools.length}</div>
                </div>

                {tools.length === 0 ? (
                    <div className="border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
                        NO TOOLS REGISTERED.
                    </div>
                ) : (
                    <div className="space-y-px">
                        {tools.map((t, i) => (
                            <div
                                key={t.id}
                                className="flex items-center justify-between border border-border bg-card p-3 transition-colors hover:bg-secondary animate-slide-up"
                                style={{ animationDelay: `${i * 30}ms`, animationFillMode: "both" }}
                            >
                                <div>
                                    <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                                        {t.name}
                                    </div>
                                    <div className="font-mono text-[10px] text-muted-foreground">
                                        {t.handle ?? "--"}
                                    </div>
                                </div>
                                <Badge
                                    variant={t.requiresOwner ? "secondary" : "outline"}
                                    className="text-[9px] uppercase"
                                >
                                    {t.requiresOwner ? "owner only" : "public"}
                                </Badge>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
