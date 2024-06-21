"use client"

import { createContext, ReactNode } from "react"
import { useQuery } from "@apollo/client"
import { GET_LOGS } from "../../graphql/queries/getLogs.gql"

type LogsProviderProps = {
    children: ReactNode
}

type LogsContextData = {
    logs: Log[]
    loading: boolean
}

interface Log {
    id: string
    message: string
    type: "task" | "event" | "note"
    notes: string[]
    status: "todo" | "partialDone" | "done" | "closed" | "impediment"
}

export const LogsContext = createContext({} as LogsContextData)

export function LogsProvider({ children }: LogsProviderProps) {
    const { data, loading } = useQuery(GET_LOGS)
    console.log("data", data)
    return (
        <LogsContext.Provider value={{
            logs: data?.logs || [],
            loading,
        }}>
            {children}
        </LogsContext.Provider>
    )
}