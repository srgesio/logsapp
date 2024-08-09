"use client"

import { useLogs } from "../../hooks/useLogs";
import SettingsIcon from "../Icons/SettingsIcon";

export function ButtonUpdateCollection({ id }: { id: string }) {
    const { showUpdateCollection, setShowUpdateCollection } = useLogs();
    return (
        <button
            className="flex justify-center items-center p-1 rounded-lg size-6 bg-gradient-to-br from-zinc-800 to-zinc-800/0 text-zinc-500"
            onClick={() => { setShowUpdateCollection({ show: !showUpdateCollection.show, id }) }}
        >
            <SettingsIcon />
        </button>

    );
}