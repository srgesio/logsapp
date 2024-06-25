"use client"
import React from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_LOG } from '@/app/graphql/mutations/deleteLog.gql'
import { useLogs } from '@/app/hooks/useLogs'
import WriteIcon from '../../Icons/WriteIcon'

type UpdateLogProps = {
    id: string
}

export function UpdateLog({ id }: UpdateLogProps) {

    const { refetch, showUpdateLog, setShowUpdateLog } = useLogs()
    const [addLog] = useMutation(DELETE_LOG, {
        onCompleted: () => {
            refetch()
            setShowUpdateLog(false)
        }
    })

    const handleSubmit = (() => {
        addLog({
            variables: {
                deletedata: {
                    id: id
                }
            }
        })
    }
    )
    return (
        <>
            {showUpdateLog && <form onSubmit={handleSubmit} className="absolute rounded-2xl top-0 left-0 w-full h-full flex bg-black/90">
                <div className="p-4 rounded-2xl flex flex-col w-full justify-between gap-4">
                    <header className="flex flex-col items-center justify-between">
                        <div className='flex justify-end w-full gap-2'>
                            <button
                                type='button'
                                className="flex justify-center items-center p-1 rounded-lg size-6 bg-gradient-to-br from-red-800 to-red-800/0 hover:bg-red-800 border-2 border-red-800"
                                onClick={() => setShowUpdateLog(false)}>
                                X
                            </button>
                        </div>
                        <div className='flex justify-center p-4 text-zinc-700'>
                            <WriteIcon />
                        </div>
                    </header>
                    <footer className="flex justify-end">
                        <button type='submit' className="bg-gradient-to-br from-red-700 to-red-700/0 border-2 border-red-600 hover:bg-red-700 py-2 px-4 rounded-lg">Deletar</button>
                    </footer>
                </div>
            </form>}
        </>
    )
}