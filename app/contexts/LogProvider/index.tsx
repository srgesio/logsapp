"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { ApolloQueryResult, OperationVariables, useQuery } from "@apollo/client"
import { GET_LOGS } from "../../graphql/queries/getLogs.gql"
import { GET_COLLECTIONS } from "../../graphql/queries/getCollections.gql"
import { Collection, Log } from "@/app/types/log"

type LogsProviderProps = {
    children: ReactNode
}

type ShowUptdateLogProps = {
    show: boolean
    id: string
}

type LogsContextData = {
    logs: Log[]
    collections: Collection[]
    loading: boolean
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
    showAddLog: boolean
    setShowAddLog: Dispatch<SetStateAction<boolean>>
    showUpdateLogStatus: ShowUptdateLogProps
    showUpdateLog: ShowUptdateLogProps
    setShowUpdateLog: Dispatch<SetStateAction<ShowUptdateLogProps>>
    setShowUpdateLogStatus: Dispatch<SetStateAction<ShowUptdateLogProps>>
    setShowCompleteLogInfo: Dispatch<SetStateAction<boolean>>
    showCompleteLogInfo: boolean
}

export const LogsContext = createContext({} as LogsContextData)

export function LogsProvider({ children }: LogsProviderProps) {
    const { data, loading, refetch } = useQuery(GET_LOGS)
    const { data: dataCollections, loading: loadingCollections, refetch: refetchCollections } = useQuery(GET_COLLECTIONS)
    const [showAddLog, setShowAddLog] = useState(false)
    const [showCompleteLogInfo, setShowCompleteLogInfo] = useState(true)
    const [showUpdateLog, setShowUpdateLog] = useState<ShowUptdateLogProps>({ show: false, id: "" })
    const [showUpdateLogStatus, setShowUpdateLogStatus] = useState<ShowUptdateLogProps>({ show: false, id: "" })

    console.log("==>dataCollections", dataCollections)
    console.log("==>logs", data?.logs)

    return (
        <LogsContext.Provider value={{
            logs: data?.logs || [],
            collections: dataCollections?.collections || [],
            loading: loading || loadingCollections,
            refetch: refetchCollections,
            showAddLog,
            setShowAddLog,
            showUpdateLog,
            setShowUpdateLog,
            showUpdateLogStatus,
            setShowUpdateLogStatus,
            setShowCompleteLogInfo,
            showCompleteLogInfo
        }}>
            {children}
        </LogsContext.Provider>
    )
}