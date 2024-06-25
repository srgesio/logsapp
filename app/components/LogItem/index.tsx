import { Log } from "@/app/types/log"
import { ButtonUpdateLog } from "../UpdateLog/AddLog/ButtonUpdateLog"
import { UpdateLog } from "../UpdateLog/AddLog"

type LogItemProps = {
    log: Log
}

export function LogItem({ log }: LogItemProps) {
    return (
        <div className="flex justify-between items-center gap-4">
            <UpdateLog id={log.id} />
            <div>
                <h3>{log.status == "todo" ? "[ ]" : log.status} - {log.message}</h3>
                <p className="text-zinc-500">{log.notes}</p>
            </div>
            <ButtonUpdateLog />

        </div>
    )
}