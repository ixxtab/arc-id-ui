export type AgentTool = {
    id: string;
    name: string;
    description?: string;
    // e.g. MCP tool name, endpoint alias, etc.
    handle?: string;
    requiresOwner?: boolean;
};

export type AgentPassport = {
    agentId: string;
    name: string;
    owner: string; // ключевое поле
    status: "active" | "inactive" | "revoked";
    tags: string[];
    description?: string;
    endpoints?: {
        mcp?: string;
        http?: string;
    };
    tools: AgentTool[];
    createdAt: string;
    updatedAt: string;
};
