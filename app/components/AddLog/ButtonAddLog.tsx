import { useLogs } from "@/app/hooks/useLogs";

export function ButtonAddLog() {
    const { showAddLog, setShowAddLog } = useLogs();
    return (
        <button
            className="bg-gradient-to-br from-blue-700 to-blue-700/0 border-2 border-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
            onClick={() => setShowAddLog(!showAddLog)}
        >
            Novo Log
        </button>
    );
}