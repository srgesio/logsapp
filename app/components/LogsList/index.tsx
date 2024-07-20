"use client"

import { useLogs } from "@/app/hooks/useLogs"
import { AddLog } from "../AddLog"
import { ButtonAddLog } from "../AddLog/ButtonAddLog"
import { LogItem } from "../LogItem"
import { UpdateLog } from "../UpdateLog"
import SettingsIcon from "../Icons/SettingsIcon"
import { Fragment } from "react"

export function LogsList() {
    const { loading, showCompleteLogInfo, setShowCompleteLogInfo, collections } = useLogs()

    if (loading) return (<p>Loading...</p>)
    return (
        <section className="min-h-[30dvh] flex flex-col gap-8">
            {collections.map((collection) => (<Fragment key={collection.id}>
                <UpdateLog key={`update-${collection.id}`} />
                <AddLog collectionId={collection.id} key={`add-${collection.id}`} />
                <section className="rounded-2xl flex flex-col gap-4 h-full p-4 bg-gradient-to-br from-white/5 to-white/0 border-1 border-zinc-800" key={`collection-${collection.id}`}>
                    <header className="flex justify-between">
                        <h2 className="font-extrabold text-lg">{collection.name}</h2>
                        <button className="flex justify-center items-center p-1 rounded-lg size-6 bg-gradient-to-br from-zinc-800 to-zinc-800/0 text-zinc-500"><SettingsIcon /></button>
                    </header>
                    {!collection?.logs?.length && <p>No logs found</p>}
                    {(collection?.logs?.length ?? 0) > 0 && collection?.logs?.map(log => (
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
                </section></Fragment>))}
        </section>
    )
}