import { Log } from "@/app/types/log"
import { ButtonUpdateLog } from "../UpdateLog/ButtonUpdateLog"
import { StatusLogSelector } from "../StatusLogSelector"
import { ButtonUpdateLogStatus } from "../StatusLogSelector/ButtonUpdateLogStatus"
import { useLogs } from "@/app/hooks/useLogs"

type LogItemProps = {
    log: Log
}

export function LogItem({ log }: LogItemProps) {
    const { showCompleteLogInfo } = useLogs()
    if (!log) return <></>;
    const handleStatusTitle = (status?: string) => {
        const statusTitle = {
            todo: 'text-white',
            partialDone: 'text-yellow-500',
            done: 'text-green-500',
            closed: 'text-yellow-700 line-through',
            impediment: 'text-red-500'
        }
        return statusTitle[status as keyof typeof statusTitle];
    }
    return (
        <div className={`flex justify-between relative items-start rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/0 hover:bg-zinc-700 gap-4 p-2`}>

            <ButtonUpdateLogStatus id={log.id} />
            <StatusLogSelector key={`statusSelector-${log.id}`} log={log} />
            <div className="w-full flex flex-col gap-1">
                <h3 className={`text-base font-bold ${handleStatusTitle(log.status)}`}>{log.message}</h3>
                {showCompleteLogInfo &&
                    <div className="flex flex-col gap-4">
                        {log?.notes?.map((note, index) => (
                            <p key={`${note}-${index}`} className="text-zinc-500 text-xs">{note}</p>
                        ))}
                    </div>
                }
            </div>
            <div className="flex flex-col gap-2 items-end">
                <ButtonUpdateLog id={log.id} />
                {!showCompleteLogInfo && !!log.notes?.[0] && <div className="size-5 flex items-center justify-center">
                    <span className="text-xs font-black text-zinc-400">
                        N
                    </span>
                </div>}
            </div>

        </div>
    )
}