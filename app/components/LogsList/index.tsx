"use client"

import { useLogs } from "@/app/hooks/useLogs"

export function LogsList() {
    const { logs, loading } = useLogs()

    console.log("logs", logs)
    if (loading) return (<p>Loading...</p>)

    if (!logs.length) return (
        <section>
            <h2 className="font-extrabold text-lg">Logs List</h2>
            <p>No logs found</p>
        </section>
    )
    return (
        <section>
            <h2 className="font-extrabold text-lg">Logs List</h2>
            <ul className="flex flex-col gap-2">
                {logs?.map(log => (
                    <li key={log.id}>{log.message}</li>
                ))}
            </ul>
        </section>
    )
}