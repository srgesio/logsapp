"use client"
import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_LOG } from '../../graphql/mutations/updateLog.gql'
import { useLogs } from '../../hooks/useLogs'
import { Log } from '@/app/types/log'

type StatusLogSelectorProps = {
    log: Log
}

export function StatusLogSelector({ log }: StatusLogSelectorProps) {
    const { refetch, showUpdateLogStatus, setShowUpdateLogStatus } = useLogs()
    const [updateLog] = useMutation(UPDATE_LOG, {
        onCompleted: () => {
            refetch()
            setShowUpdateLogStatus({ show: false, id: "" })
        }
    })

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!showUpdateLogStatus.show) {
                return
            }
            const target = event.target as HTMLElement
            if (!target.closest('.absolute')) {
                setShowUpdateLogStatus({ show: false, id: "" })
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [showUpdateLogStatus.show])


    const handleSelect = ((statusSelected: string) => {

        updateLog({
            variables: {
                updatedata: {
                    id: showUpdateLogStatus.id,
                    status: statusSelected,
                }
            }
        })
    }
    )
    const handleStatusPresentation = ((status: string) => {
        const statusPresentation = {
            todo: "⬜",
            partialDone: "🟨",
            done: "🟩",
            closed: "🟫",
            impediment: "🟥"
        }
        return statusPresentation[status as keyof typeof statusPresentation];
    })
    return (
        <>
            {showUpdateLogStatus.show && showUpdateLogStatus.id === log?.id && <div className="absolute top-11 mt-2 w-full max-w-40 z-10 p-4 rounded-2xl flex flex-col bg-zinc-800 justify-between gap-4">
                <section className='flex flex-col items-start gap-2'>
                    <button onClick={() => handleSelect("todo")}> {handleStatusPresentation("todo")} Pendente</button>
                    <button onClick={() => handleSelect("partialDone")}>{handleStatusPresentation("partialDone")} Adiado</button>
                    <button onClick={() => handleSelect("done")}>{handleStatusPresentation("done")} Feito</button>
                    <button onClick={() => handleSelect("impediment")}>{handleStatusPresentation("impediment")} Impedido</button>
                </section>
            </div>
            }
        </>
    )
}