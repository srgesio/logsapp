import { Log } from "@/app/types/log"
import { ButtonUpdateLog } from "../UpdateLog/ButtonUpdateLog"
import { StatusLogSelector } from "../StatusLogSelector"
import { ButtonUpdateLogStatus } from "../StatusLogSelector/ButtonUpdateLogStatus"

type LogItemProps = {
    log: Log
}

export function LogItem({ log }: LogItemProps) {
    return (
        <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4">
                <div className="relative flex gap-4">

                    <ButtonUpdateLogStatus id={log.id} />
                    <StatusLogSelector key={`statusSelector-${log.id}`} log={log} />
                </div>
                <div>
                    <h3>{log.message}</h3>
                    {log?.notes?.map((note, index) => (
                        <p key={`${note}-${index}`} className="text-zinc-500">{note}</p>
                    ))}
                </div>
            </div>
            <ButtonUpdateLog id={log.id} />

        </div>
    )
}