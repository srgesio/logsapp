"use client"

import { useLogs } from "../../hooks/useLogs";

export function ButtonAddCollection() {
    const { showAddCollection, setShowAddCollection } = useLogs();
    return (
        <button
            className="bg-gradient-to-br from-zinc-900 to-zinc-900/0 border-2 border-zinc-800 hover:bg-zinc-800 py-2 px-4 rounded-lg"
            onClick={() => { setShowAddCollection(!showAddCollection) }}
        >
            Nova Coleção
        </button>
    );
}