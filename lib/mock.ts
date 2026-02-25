import { AgentPassport } from "@/lib/types";

export const MOCK_AGENTS: AgentPassport[] = [
    {
        agentId: "agent_8004_0001",
        name: "ClawScout",
        owner: "0x7E57DEMO8004", // matching mock wallet address for dashboard demo
        status: "active",
        tags: ["osint", "dex", "risk"],
        description: "Scans token socials, heuristics, basic on-chain signals.",
        endpoints: { mcp: "mcp://clawscout.arc/8004", http: "https://clawscout.arc/api" },
        tools: [
            { id: "t1", name: "Token Snapshot", handle: "token_snapshot", requiresOwner: false },
            { id: "t2", name: "Deep OSINT", handle: "deep_osint", requiresOwner: true },
        ],
        createdAt: "2026-02-01",
        updatedAt: "2026-02-20",
    },
    {
        agentId: "agent_8004_0002",
        name: "NullClawDeploy",
        owner: "0x2222222222222222222222222222222222222222",
        status: "active",
        tags: ["devops", "deploy", "zig"],
        description: "Deploys nullclaw instances with encrypted storage defaults.",
        endpoints: { mcp: "mcp://nullclaw.arc/8004" },
        tools: [
            { id: "t3", name: "Deploy Instance", handle: "deploy_instance", requiresOwner: true },
            { id: "t4", name: "Rotate Keys", handle: "rotate_keys", requiresOwner: true },
        ],
        createdAt: "2026-02-10",
        updatedAt: "2026-02-23",
    },
];
