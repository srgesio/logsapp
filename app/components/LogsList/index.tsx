"use client"

import { useLogs } from "@/app/hooks/useLogs"
import { AddLog } from "../AddLog"
import { ButtonAddLog } from "../AddLog/ButtonAddLog"
import { LogItem } from "../LogItem"
import { UpdateLog } from "../UpdateLog"
import SettingsIcon from "../Icons/SettingsIcon"
import { Fragment } from "react"
import { AddCollection } from "../AddCollection"
import { UpdateCollection } from "../UpdateCollection"
import { ButtonUpdateCollection } from "../UpdateCollection/ButtonUpdateCollection"

export function LogsList() {
    const { loading, showCompleteLogInfo, setShowCompleteLogInfo, collections, showUpdateCollection } = useLogs()

    if (loading) return (<p>Loading...</p>)
    return (
        <section className="min-h-[30dvh] flex flex-col lg:flex-row gap-8">
            {collections.map((collection) => (<Fragment key={collection.id}>
                <UpdateLog key={`update-log-${collection.id}`} />
                <AddLog collectionId={collection.id} key={`add-log-${collection.id}`} />
                <section className="rounded-2xl relative flex flex-col gap-4 h-full p-4 bg-gradient-to-br from-white/5 to-white/0 border-1 border-zinc-800 w-full" key={`collection-${collection.id}`}>
                    <UpdateCollection collectionId={collection.id} collectionName={collection.name} key={`update-collection-${collection.id}`} />
                    {showUpdateCollection.id !== collection.id && <header className="flex justify-between">
                        <h2 className="font-extrabold text-lg">{collection.name}</h2>
                        <ButtonUpdateCollection id={collection.id} />
                    </header>}
                    {showUpdateCollection.id !== collection.id && !collection?.logs?.length && <p>No logs found</p>}
                    {showUpdateCollection.id !== collection.id && (collection?.logs?.length ?? 0) > 0 && collection?.logs?.map(log => (
                        <LogItem key={log.id} log={log} />
                    ))}
                    {showUpdateCollection.id !== collection.id && <footer className="flex justify-between">
                        <button
                            className="bg-gradient-to-br from-zinc-900 to-zinc-900/0 border-2 border-zinc-800 hover:bg-zinc-800 py-2 px-4 rounded-lg"
                            onClick={() => setShowCompleteLogInfo(!showCompleteLogInfo)}
                        >
                            {showCompleteLogInfo ? 'Ver menos' : 'Ver mais'}
                        </button>
                        <ButtonAddLog />
                    </footer>}
                </section></Fragment>))}
            <AddCollection />
        </section>
    )
}