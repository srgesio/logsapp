"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { ApolloQueryResult, OperationVariables, useQuery } from "@apollo/client"
import { GET_LOGS } from "../../graphql/queries/getLogs.gql"

type LogsProviderProps = {
    children: ReactNode
}

type ShowUptdateLogProps = {
    show: boolean
    id: string
}

type LogsContextData = {
    logs: Log[]
    loading: boolean
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
    showAddLog: boolean
    setShowAddLog: Dispatch<SetStateAction<boolean>>
    showUpdateLog: ShowUptdateLogProps
    setShowUpdateLog: Dispatch<SetStateAction<ShowUptdateLogProps>>
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
    const { data, loading, refetch } = useQuery(GET_LOGS)
    const [showAddLog, setShowAddLog] = useState(false)
    const [showUpdateLog, setShowUpdateLog] = useState<ShowUptdateLogProps>({ show: false, id: "" })
    return (
        <LogsContext.Provider value={{
            logs: data?.logs || [],
            loading,
            refetch,
            showAddLog,
            setShowAddLog,
            showUpdateLog,
            setShowUpdateLog
        }}>
            {children}
        </LogsContext.Provider>
    )
}