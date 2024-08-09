"use client"
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_COLLECTION } from '@/app/graphql/mutations/collection/addCollection.gql'
import { useLogs } from '@/app/hooks/useLogs'
import WriteIcon from '../Icons/WriteIcon'

export function AddCollection() {

    const { refetch, showAddCollection, setShowAddCollection } = useLogs()
    function finishAdding() {
        setShowAddCollection(false)
    }
    const [addCollection] = useMutation(ADD_COLLECTION, {
        onCompleted: () => {
            refetch()
            finishAdding()
        }
    })

    const handleSubmit = ((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        addCollection({
            variables: {
                adddata: {
                    name: formData.get('collectionName'),
                }
            }
        })
    }
    )
    return (
        <>
            {showAddCollection && <form onSubmit={(e) => handleSubmit(e)} id='newCollection' className="rounded-2xl flex flex-col gap-4 h-full p-4 bg-gradient-to-br from-white/5 to-white/0 border-1 border-zinc-800 w-full">

                <header className="flex flex-col items-center justify-between">
                    <div className='flex justify-end w-full gap-2'>
                        <button
                            type='button'
                            className="flex justify-center items-center p-1 rounded-lg size-6 bg-gradient-to-br from-red-800 to-red-800/0 hover:bg-red-800 border-2 border-red-800"
                            onClick={() => finishAdding()}>
                            X
                        </button>
                    </div>
                    <div className='flex justify-center p-4 text-zinc-700'>
                        <WriteIcon />
                    </div>
                </header>
                <section className='flex flex-col overflow-auto gap-2 w-full'>
                    <label className='text-zinc-500' htmlFor='collectionName'>Nome da coleção:</label>
                    <input
                        type='text'
                        name={'collectionName'}
                        id={'collectionName'}
                        className="p-2 rounded-lg border-2 w-full border-zinc-800 bg-zinc-900 min-h-12"
                        placeholder={'Novo projeto...'}
                    />
                </section>
                <footer className="flex justify-end">
                    <button type='submit' className="bg-gradient-to-br from-emerald-700 to-emerald-700/0 border-2 border-emerald-600 hover:bg-emerald-700 py-2 px-4 rounded-lg">Salvar</button>
                </footer>
            </form>}
        </>
    )
}