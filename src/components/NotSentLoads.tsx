
import React, { useEffect } from 'react'
import { Box, useToast } from 'native-base'
import { LoadType } from '../pages/NewLoad';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import * as loadSchema from '../database/schema';
import { saveLoad } from '../services/loads';
import { eq } from 'drizzle-orm';
import { useInternet } from '../hooks/use-internet';
import { useNotSentLoads } from '../hooks/use-not-sent-loads';

type FileInfo = FileSystem.FileInfo

export const NotSentLoads = () => {
    const hasInternet = useInternet()

    const database = useSQLiteContext()
    const db = drizzle(database, { schema: loadSchema })

    const toast = useToast()

    const { notSentLoads, fetchLocalNotSent } = useNotSentLoads()

    useEffect(() => {
        sendMissingLoads()
    }, [hasInternet])

    useEffect(() => {
        fetchLocalNotSent()
    }, [])

    const sendMissingLoads = async () => {
        if (!hasInternet) return

        for await (let load of notSentLoads) {
            try {
                await saveLoad({
                    ...load,
                    signature: {
                        uri: load.signaturePath,
                    } as FileInfo
                })
                await db.delete(loadSchema.load).where(eq(loadSchema.load.id, load.id));
                fetchLocalNotSent()
            } catch (e) {
                toast.show({
                    title: "Erro Carregamento",
                    description: "Houve um erro ao fazer upload do carregamento"
                })

                console.error(e)
            }
        }
    }

    return (
        <>
            {notSentLoads.length > 0 &&
                <Box backgroundColor={"yellow"} borderTopWidth={1} borderBottomWidth={1}>
                    {hasInternet ?
                        <>
                            <Box _text={{ textAlign: 'center' }}>Enviando restantes...</Box>
                            <Box _text={{ textAlign: 'center' }}>{`Restam: ${notSentLoads.length}`}</Box>
                        </>
                        :
                        <>
                            <Box _text={{ textAlign: 'center' }}>{`Carregamentos não enviados: ${notSentLoads.length}`}</Box>
                            <Box _text={{ textAlign: 'center' }}>Conecte-se a internet para enviar</Box>
                        </>
                    }
                </Box>
            }
        </>
    )
}
