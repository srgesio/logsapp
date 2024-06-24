"use client"
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_LOG } from '@/app/graphql/mutations/addLog.gql'
import { useLogs } from '@/app/hooks/useLogs'

export function AddLog() {
    const [message, setMessage] = useState('')
    const [type, setType] = useState('note')
    const { refetch, showAddLog, setShowAddLog } = useLogs()
    const [addLog] = useMutation(ADD_LOG, {
        onCompleted: () => {
            refetch()
            setMessage('')
            setShowAddLog(false)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addLog({
            variables: {
                adddata: {
                    message
                }
            }
        })
    }

    return (
        <>
            {showAddLog && <form onSubmit={handleSubmit} className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/90">
                <div className="p-4 rounded-2xl flex flex-col gap-4">
                    <header className="flex justify-between">
                        <h2 className="font-extrabold text-lg">New Log</h2>
                        <button className="flex justify-center items-center p-1 rounded-lg size-6 bg-gradient-to-br from-zinc-800 to-zinc-800/0" onClick={() => setType(type === 'note' ? 'todo' : 'note')}>{type === 'note' ? 'N' : 'T'}</button>
                    </header>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="p-2 rounded-lg border-2 border-zinc-800 bg-zinc-900"
                        placeholder="Write your message here"
                    />
                    <footer className="flex justify-end">
                        <button className="bg-gradient-to-br from-zinc-900 to-zinc-900/0 border-2 border-zinc-800 hover:bg-zinc-800 py-2 px-4 rounded-lg">Save</button>
                    </footer>
                </div>
            </form>}
        </>
    )
}