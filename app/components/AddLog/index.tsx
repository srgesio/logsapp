"use client"
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_LOG } from '@/app/graphql/mutations/addLog.gql'
import { useLogs } from '@/app/hooks/useLogs'
import WriteIcon from '../Icons/WriteIcon'

export function AddLog() {

    const { refetch, showAddLog, setShowAddLog } = useLogs()
    const [notes, setNotes] = useState<string[]>([''])
    const [addLog] = useMutation(ADD_LOG, {
        onCompleted: () => {
            refetch()
            setShowAddLog(false)
        }
    })

    const handleSubmit = ((e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget)
        addLog({
            variables: {
                adddata: {
                    message: formData.get('message'),
                    notes: formData.get('notes')
                }
            }
        })
    }
    )
    return (
        <>
            {showAddLog && <form onSubmit={(e) => handleSubmit(e)} className="absolute rounded-2xl top-0 left-0 w-full h-full flex bg-black/90">
                <div className="p-4 rounded-2xl flex flex-col w-full justify-between gap-4">
                    <header className="flex flex-col items-center justify-between">
                        <div className='flex justify-end w-full gap-2'>
                            <button
                                type='button'
                                className="flex justify-center items-center p-1 rounded-lg size-6 bg-gradient-to-br from-red-800 to-red-800/0 hover:bg-red-800 border-2 border-red-800"
                                onClick={() => setShowAddLog(false)}>
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
                            required
                            className="p-2 rounded-lg border-2 border-zinc-800 bg-zinc-900 min-h-12"
                            placeholder={'O que você precisa fazer?'}
                        />
                    </section>
                    <section className='flex flex-col gap-2 w-full'>
                        <label className='text-zinc-500' htmlFor='notes'>Notas:</label>
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
                    <footer className="flex justify-end">
                        <button type='submit' className="bg-gradient-to-br from-emerald-700 to-emerald-700/0 border-2 border-emerald-600 hover:bg-emerald-700 py-2 px-4 rounded-lg">Salvar</button>
                    </footer>
                </div>
            </form>}
        </>
    )
}