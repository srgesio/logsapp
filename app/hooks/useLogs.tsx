import { useContext } from "react"
import { LogsContext } from "../contexts/LogProvider"

export function useLogs() {
    const data = useContext(LogsContext)
    if (!data) {
        throw new Error("useLogs must be used within a LogsProvider")
    }
    return data
}