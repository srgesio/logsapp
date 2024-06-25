import { Log } from "@/app/types/log"
import { ButtonUpdateLog } from "../UpdateLog/ButtonUpdateLog"
import { UpdateLog } from "../UpdateLog"

type LogItemProps = {
    log: Log
}

export function LogItem({ log }: LogItemProps) {
    return (
        <div className="flex justify-between items-center gap-4">
            <UpdateLog />
            <div>
                <h3>{log.status == "todo" ? "[ ]" : log.status} - {log.message}</h3>
                {log?.notes?.map((note) => (
                    <p key={note} className="text-zinc-500">{note}</p>
                ))}
            </div>
            <ButtonUpdateLog id={log.id} />

        </div>
    )
}