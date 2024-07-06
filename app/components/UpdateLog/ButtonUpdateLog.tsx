import { useLogs } from "../../hooks/useLogs";
import MenuIcon from "../Icons/MenuIcon";

export function ButtonUpdateLog({ id }: { id: string }) {
    const { showUpdateLog, setShowUpdateLog } = useLogs();
    return (
        <button
            className="p-1 bg-gradient-to-br from-zinc-700 to-zinc-700/0 hover:bg-zinc-700 rounded-lg"
            onClick={() => setShowUpdateLog({ show: !showUpdateLog.show, id })}
        >
            <MenuIcon />
        </button>
    );
}