"use client";

import { useEffect, useMemo, useState } from "react";
import { searchRegistry } from "@/lib/registry";
import { AgentTool } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="text-4xl font-semibold tracking-tight">Tools</div>
                <div className="text-sm text-muted-foreground">
                    Public catalog of declared tools across agents. Owner-only tools still require Dashboard access.
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Card className="rounded-2xl">
                    <CardHeader className="pb-2">
                        <div className="text-xs text-muted-foreground">Total tools</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{stats.total}</div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl">
                    <CardHeader className="pb-2">
                        <div className="text-xs text-muted-foreground">Owner-only</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{stats.ownerOnly}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-2xl">
                <CardHeader className="pb-2">
                    <div className="text-sm font-medium">Tool list</div>
                    <div className="text-xs text-muted-foreground">Later you can add search + tags + categories.</div>
                </CardHeader>
                <CardContent className="space-y-2">
                    {tools.length === 0 ? (
                        <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">No tools yet.</div>
                    ) : (
                        tools.map((t) => (
                            <div key={t.id} className="flex items-center justify-between rounded-2xl border p-3">
                                <div>
                                    <div className="font-medium text-sm">{t.name}</div>
                                    <div className="text-xs text-muted-foreground font-mono">{t.handle ?? "—"}</div>
                                </div>
                                <Badge variant={t.requiresOwner ? "secondary" : "outline"} className="rounded-xl">
                                    {t.requiresOwner ? "owner only" : "public"}
                                </Badge>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
