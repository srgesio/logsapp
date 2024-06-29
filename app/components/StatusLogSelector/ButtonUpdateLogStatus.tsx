import { useLogs } from "../../hooks/useLogs";

export function ButtonUpdateLogStatus({ id }: { id: string }) {
    const { showUpdateLogStatus, setShowUpdateLogStatus, logs } = useLogs();
    const currentLog = logs.find(log => log.id === id);

    const handleStatusPresentation = (status: string) => {
        const statusPresentation = {
            todo: "⬜",
            partialDone: "🟨",
            done: "🟩",
            closed: "🟫",
            impediment: "🟥"
        }
        return statusPresentation[status as keyof typeof statusPresentation];
    }
    return (
        <button
            className="h-fit bg-gradient-to-br from-zinc-700 to-zinc-700/0 border-2 border-zinc-600 hover:bg-zinc-700 py-1 px-2 rounded-lg"
            onClick={() => setShowUpdateLogStatus({ show: !showUpdateLogStatus.show, id })}
        >
            {handleStatusPresentation(currentLog?.status || "todo")}
        </button>
    );
}