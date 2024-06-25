"use client"
import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_LOG } from '../../graphql/mutations/deleteLog.gql'
import { UPDATE_LOG } from '../../graphql/mutations/updateLog.gql'
import { useLogs } from '../../hooks/useLogs'
import WriteIcon from '../Icons/WriteIcon'


export function UpdateLog() {
    const { refetch, showUpdateLog, setShowUpdateLog, logs } = useLogs()
    const currentLog = logs.find(log => log.id === showUpdateLog.id)
    const [notes, setNotes] = React.useState(currentLog?.notes || [])
    const [updateLog] = useMutation(UPDATE_LOG, {
        onCompleted: () => {
            refetch()
            setShowUpdateLog({ show: false, id: "" })
        }
    })
    const [deleteLog] = useMutation(DELETE_LOG, {
        onCompleted: () => {
            refetch()
            setShowUpdateLog({ show: false, id: "" })
        }
    })

    useEffect(() => {
        setNotes(currentLog?.notes || [])
    }, [currentLog?.notes])

    const handleSubmit = ((e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget)

        const notes = Array.from(formData.keys())
            .filter(key => key.startsWith('note-'))
            .map(key => formData.get(key))

        updateLog({
            variables: {
                updatedata: {
                    id: showUpdateLog.id,
                    message: formData.get('message'),
                    notes
                }
            }
        })
    }
    )
    const handleDelete = (() => {
        deleteLog({
            variables: {
                deletedata: {
                    id: showUpdateLog.id
                }
            }
        })
    }
    )
    return (
        <>
            {showUpdateLog.show && <form onSubmit={handleSubmit} className="absolute rounded-2xl top-0 left-0 w-full h-full flex bg-black/90">
                <div className="p-4 rounded-2xl flex flex-col w-full justify-between gap-4">
                    <header className="flex flex-col items-center justify-between">
                        <div className='flex justify-end w-full gap-2'>
                            <button
                                type='button'
                                className="flex justify-center items-center p-1 rounded-lg size-6 bg-gradient-to-br from-red-800 to-red-800/0 hover:bg-red-800 border-2 border-red-800"
                                onClick={() => setShowUpdateLog({ show: false, id: '' })}>
                                X
                            </button>
                        </div>
                        <div className='flex justify-center p-4 text-zinc-700'>
                            <WriteIcon />
                        </div>
                    </header>
                    <section className='flex flex-col gap-2 w-full'>
                        <label className='text-zinc-500' htmlFor='message'>Mensagem:</label>
                        <textarea
                            name="message"
                            id="message"
                            defaultValue={currentLog?.message}
                            className="p-2 rounded-lg border-2 border-zinc-800 bg-zinc-900 min-h-12"
                            placeholder={'O que você precisa fazer?'}
                        />
                    </section>
                    <section className='flex flex-col gap-2 w-full'>
                        <label className='text-zinc-500' >Notas:</label>
                        {
                            notes?.map((note, index) => (
                                <div className='flex gap-2 w-full items-center' key={`note-${index}`}>
                                    <textarea
                                        name={`note-${index}`}
                                        id={`note-${index}`}
                                        defaultValue={note}
                                        className="p-2 rounded-lg border-2 w-full border-zinc-800 bg-zinc-900 min-h-12"
                                        placeholder={'Faça uma anotação...'}
                                    />
                                    <button
                                        type='button'
                                        className="flex justify-center items-center p-1 rounded-lg size-6 bg-gradient-to-br from-red-800 to-red-800/0 hover:bg-red-800 border-2 border-red-800"
                                        onClick={() => setNotes([...notes.filter((_, indexFilter) => index !== indexFilter)])}>
                                        -
                                    </button>
                                </div>
                            ))
                        }
                        <button className="bg-gradient-to-br from-zinc-700 to-zinc-700/0 border-2 border-zinc-600 hover:bg-zinc-700 py-2 px-4 rounded-lg" type="button" onClick={() => setNotes([...notes, ''])}>+ nota</button>
                    </section>
                    <footer className="flex justify-between">
                        <button type='button' onClick={handleDelete} className="bg-gradient-to-br from-red-700 to-red-700/0 border-2 border-red-600 hover:bg-red-700 py-2 px-4 rounded-lg">Deletar</button>
                        <button type='submit' className="bg-gradient-to-br from-emerald-700 to-emerald-700/0 border-2 border-emerald-600 hover:bg-emerald-700 py-2 px-4 rounded-lg">Atualizar</button>
                    </footer>
                </div>
            </form>}
        </>
    )
}