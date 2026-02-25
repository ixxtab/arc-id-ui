"use client";

import { useEffect, useMemo, useState } from "react";
import { searchRegistry } from "@/lib/registry";
import { AgentPassport } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

function StatCard({ title, value, hint }: { title: string; value: string; hint?: string }) {
    return (
        <Card className="rounded-2xl">
            <CardHeader className="pb-2">
                <div className="text-xs text-muted-foreground">{title}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-semibold">{value}</div>
                {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
            </CardContent>
        </Card>
    );
}

export function ExplorerPage() {
    const [q, setQ] = useState("");
    const [status, setStatus] = useState<"all" | "active" | "inactive" | "revoked">("all");
    const [data, setData] = useState<AgentPassport[]>([]);

    useEffect(() => {
        (async () => {
            const res = await searchRegistry({ q, status });
            setData(res);
        })();
    }, [q, status]);

    const stats = useMemo(() => {
        const total = data.length;
        const active = data.filter((x) => x.status === "active").length;
        const tools = data.reduce((acc, x) => acc + x.tools.length, 0);
        const owners = new Set(data.map((x) => x.owner.toLowerCase())).size;
        return { total, active, tools, owners };
    }, [data]);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="text-4xl font-semibold tracking-tight text-foreground">Arc ID</div>
                <div className="text-sm text-muted-foreground">
                    The Identity Layer for Autonomous Agents. Search by name, agent ID, or owner address.
                </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="flex-1">
                    <Input
                        placeholder="Search by name / agentId / owner…"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="h-11 rounded-2xl"
                    />
                </div>
                <div className="w-full md:w-52">
                    <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                        <SelectTrigger className="h-11 rounded-2xl">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="revoked">Revoked</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <StatCard title="Agents" value={String(stats.total)} hint="matching filter" />
                <StatCard title="Active" value={String(stats.active)} />
                <StatCard title="Tools declared" value={String(stats.tools)} />
                <StatCard title="Unique owners" value={String(stats.owners)} />
            </div>

            <Card className="rounded-2xl">
                <CardHeader className="pb-2">
                    <div className="text-sm font-medium">Registry results</div>
                    <div className="text-xs text-muted-foreground">
                        Tip: connect wallet in Dashboard to access owner-only tools.
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {data.length === 0 ? (
                        <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
                            Nothing found. Try a different query.
                        </div>
                    ) : (
                        data.map((a) => (
                            <div
                                key={a.agentId}
                                className="flex flex-col gap-2 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between"
                            >
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold">{a.name}</div>
                                        <Badge variant="secondary" className="rounded-xl">
                                            {a.status}
                                        </Badge>
                                    </div>
                                    <div className="mt-1 truncate text-xs text-muted-foreground">
                                        {a.agentId} · owner {a.owner}
                                    </div>
                                    {a.description ? (
                                        <div className="mt-2 text-sm text-muted-foreground">{a.description}</div>
                                    ) : null}
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {a.tags.map((t) => (
                                            <Badge key={t} variant="outline" className="rounded-xl">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 md:shrink-0">
                                    <Link
                                        href="/dashboard"
                                        className="rounded-xl bg-muted px-3 py-2 text-sm hover:bg-muted/70"
                                    >
                                        Open in Dashboard
                                    </Link>
                                    <div className="rounded-xl border px-3 py-2 text-sm text-muted-foreground">
                                        tools: {a.tools.length}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
