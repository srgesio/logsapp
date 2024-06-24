"use client"

import { useLogs } from "@/app/hooks/useLogs"
import { AddLog } from "../AddLog"
import { ButtonAddLog } from "../AddLog/ButtonAddLog"

export function LogsList() {
    const { logs, loading } = useLogs()

    if (loading) return (<p>Loading...</p>)
    return (
        <section className="rounded-2xl overflow-hidden relative">
            <AddLog />
            <section className="flex flex-col gap-4 p-4 bg-gradient-to-br from-white/5 to-white/0 hover:bg-white/5 border-1 border-zinc-800">
                <header className="flex justify-between">
                    <h2 className="font-extrabold text-lg">List Title</h2>
                    <button className="flex justify-center items-center p-1 rounded-lg size-6 bg-gradient-to-br from-zinc-800 to-zinc-800/0">=</button>
                </header>
                {!logs.length && <p>No logs found</p>}
                {logs.length > 0 && <ul className="flex flex-col gap-2">
                    {logs?.map(log => (
                        <li key={log.id}>{log.message}</li>
                    ))}
                </ul>}
                <footer className="flex justify-between">
                    <button className="bg-gradient-to-br from-zinc-900 to-zinc-900/0 border-2 border-zinc-800 hover:bg-zinc-800 py-2 px-4 rounded-lg">Ver mais</button>
                    <ButtonAddLog />
                </footer>
            </section>
        </section>
    )
}