"use client"

import { useLogs } from "@/app/hooks/useLogs"
import { AddLog } from "../AddLog"
import { ButtonAddLog } from "../AddLog/ButtonAddLog"
import { LogItem } from "../LogItem"
import { UpdateLog } from "../UpdateLog"
import SettingsIcon from "../Icons/SettingsIcon"

export function LogsList() {
    const { logs, loading, showCompleteLogInfo, setShowCompleteLogInfo } = useLogs()

    if (loading) return (<p>Loading...</p>)
    return (
        <section className="relative min-h-[30dvh]">
            <UpdateLog />
            <AddLog />
            <section className="rounded-2xl flex flex-col gap-4 h-full p-4 bg-gradient-to-br from-white/5 to-white/0 border-1 border-zinc-800">
                <header className="flex justify-between">
                    <h2 className="font-extrabold text-lg">List Title</h2>
                    <button className="flex justify-center items-center p-1 rounded-lg size-6 bg-gradient-to-br from-zinc-800 to-zinc-800/0 text-zinc-500"><SettingsIcon /></button>
                </header>
                {!logs.length && <p>No logs found</p>}
                {logs.length > 0 && logs?.map(log => (
                    <LogItem key={log.id} log={log} />
                ))}
                <footer className="flex justify-between">
                    <button
                        className="bg-gradient-to-br from-zinc-900 to-zinc-900/0 border-2 border-zinc-800 hover:bg-zinc-800 py-2 px-4 rounded-lg"
                        onClick={() => setShowCompleteLogInfo(!showCompleteLogInfo)}
                    >
                        {showCompleteLogInfo ? 'Ver menos' : 'Ver mais'}
                    </button>
                    <ButtonAddLog />
                </footer>
            </section>
        </section>
    )
}