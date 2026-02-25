import { AgentPassport } from "@/lib/types";
import { MOCK_AGENTS } from "@/lib/mock";

export type SearchParams = {
    q?: string;
    tag?: string;
    status?: "active" | "inactive" | "revoked" | "all";
};

export async function searchRegistry(params: SearchParams): Promise<AgentPassport[]> {
    const q = (params.q ?? "").trim().toLowerCase();
    const tag = (params.tag ?? "").trim().toLowerCase();
    const status = params.status ?? "all";

    // TODO: заменить на запрос к индексеру/сабграфу/контракту
    let list = [...MOCK_AGENTS];

    if (status !== "all") list = list.filter((a) => a.status === status);
    if (tag) list = list.filter((a) => a.tags.some((t) => t.toLowerCase() === tag));
    if (q) {
        list = list.filter((a) => {
            return (
                a.name.toLowerCase().includes(q) ||
                a.agentId.toLowerCase().includes(q) ||
                a.owner.toLowerCase().includes(q)
            );
        });
    }

    return list;
}

export async function getByOwner(owner: string): Promise<AgentPassport[]> {
    const o = owner.toLowerCase();
    // TODO: заменить
    return MOCK_AGENTS.filter((a) => a.owner.toLowerCase() === o);
}
