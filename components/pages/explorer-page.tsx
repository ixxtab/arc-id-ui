"use client";

import { useEffect, useMemo, useState } from "react";
import { searchRegistry } from "@/lib/registry";
import { AgentPassport } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

function StatBlock({ label, value, hint }: { label: string; value: string; hint?: string }) {
    return (
        <div className="border border-border p-4 animate-fade-in">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">{value}</div>
            {hint && <div className="mt-1 text-[10px] text-muted-foreground">{hint}</div>}
        </div>
    );
}

function StatusDot({ status }: { status: string }) {
    return (
        <span className="relative mr-1.5 inline-flex h-1.5 w-1.5">
            {status === "active" && (
                <span className="absolute inline-flex h-full w-full animate-pulse-slow rounded-full bg-accent" />
            )}
            <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                    status === "active"
                        ? "bg-accent"
                        : status === "inactive"
                        ? "bg-muted-foreground"
                        : "bg-destructive"
                }`}
            />
        </span>
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
        <div className="space-y-8">
            {/* Title block */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <span className="inline-block h-px w-6 bg-accent" />
                    <span className="text-[10px] uppercase tracking-widest text-accent">Registry</span>
                </div>
                <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">
                    Arc ID
                </h1>
                <p className="max-w-lg text-xs leading-relaxed text-muted-foreground">
                    The Identity Layer for Autonomous Agents. Search by name, agent ID, or owner address.
                </p>
            </div>

            {/* Search row */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="flex-1">
                    <Input
                        placeholder="SEARCH: name / agentId / owner..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="h-10"
                    />
                </div>
                <div className="w-full md:w-48">
                    <Select value={status} onValueChange={(v: string) => setStatus(v as typeof status)}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ALL</SelectItem>
                            <SelectItem value="active">ACTIVE</SelectItem>
                            <SelectItem value="inactive">INACTIVE</SelectItem>
                            <SelectItem value="revoked">REVOKED</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
                <StatBlock label="Agents" value={String(stats.total)} hint="matching filter" />
                <StatBlock label="Active" value={String(stats.active)} />
                <StatBlock label="Tools declared" value={String(stats.tools)} />
                <StatBlock label="Unique owners" value={String(stats.owners)} />
            </div>

            {/* Results */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Registry results / {data.length}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                        Connect wallet in Dashboard for owner-only tools
                    </div>
                </div>

                {data.length === 0 ? (
                    <div className="border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
                        NO RESULTS FOUND. ADJUST QUERY.
                    </div>
                ) : (
                    <div className="space-y-px">
                        {data.map((a, i) => (
                            <div
                                key={a.agentId}
                                className="group flex flex-col gap-3 border border-border bg-card p-4 transition-colors hover:bg-secondary md:flex-row md:items-center md:justify-between animate-slide-up"
                                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
                            >
                                <div className="min-w-0 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <StatusDot status={a.status} />
                                        <span className="text-sm font-semibold uppercase tracking-wide text-foreground">
                                            {a.name}
                                        </span>
                                        <Badge variant="outline" className="text-[9px] uppercase">
                                            {a.status}
                                        </Badge>
                                    </div>
                                    <div className="truncate text-[10px] text-muted-foreground font-mono">
                                        {a.agentId} / owner:{a.owner}
                                    </div>
                                    {a.description && (
                                        <div className="text-xs leading-relaxed text-muted-foreground">{a.description}</div>
                                    )}
                                    <div className="flex flex-wrap gap-1.5">
                                        {a.tags.map((t) => (
                                            <Badge key={t} variant="secondary" className="text-[9px] uppercase">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 md:shrink-0">
                                    <Link
                                        href="/dashboard"
                                        className="border border-border px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                                    >
                                        Open
                                    </Link>
                                    <div className="border border-border px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                                        tools:{a.tools.length}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
