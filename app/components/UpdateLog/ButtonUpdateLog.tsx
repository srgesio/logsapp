import { useLogs } from "../../hooks/useLogs";

export function ButtonUpdateLog({ id }: { id: string }) {
    const { showUpdateLog, setShowUpdateLog } = useLogs();
    return (
        <button
            className="size-6 bg-gradient-to-br from-zinc-700 to-zinc-700/0 border-2 border-zinc-600 hover:bg-zinc-700 rounded-lg"
            onClick={() => setShowUpdateLog({ show: !showUpdateLog.show, id })}
        >
            -
        </button>
    );
}