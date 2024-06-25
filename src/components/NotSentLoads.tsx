
import React, { useEffect, useState } from 'react'
import { useNetInfo } from '@react-native-community/netinfo';
import { Box, useToast } from 'native-base'
import { LoadType } from '../pages/NewLoad';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import * as loadSchema from '../database/schema';
import { saveLoad } from '../services/loads';
import { eq } from 'drizzle-orm';

export const NotSentLoads = () => {
    const netInfo = useNetInfo()
    const [notSentLoads, setNotSentLoads] = useState<(LoadType & { id: string })[]>([]);

    const database = useSQLiteContext()
    const db = drizzle(database, { schema: loadSchema })

    const toast = useToast()

    useEffect(() => {
        const hasInternet = netInfo.isInternetReachable && netInfo.isConnected
        if (hasInternet) {
            sendMissingLoads()
        }
    }, [netInfo.isInternetReachable, netInfo.isConnected])

    useEffect(() => {
        fetchNotSent()
    }, [])

    const fetchNotSent = async () => {
        const result = await db.query.load.findMany<LoadType[]>()
        setNotSentLoads(result)
    }


    const sendMissingLoads = async () => {
        notSentLoads.forEach(async (load) => {
            try {
                await saveLoad(load as LoadType)
                await db.delete(loadSchema.load).where(eq(loadSchema.load.id, load.id));
            } catch (e) {
                toast.show({
                    title: "Erro Carregamento",
                    description: "Houve um erro ao fazer upload do carregamento"
                })

                console.error(e)
            }
        })
    }

    return (
        <>
            {notSentLoads.length > 0 &&
                <Box backgroundColor={"yellow"} borderTopWidth={1} borderBottomWidth={1}>
                    {!netInfo.isInternetReachable ?
                        <>
                            <Box _text={{ textAlign: 'center' }}>{`Carregamentos não enviados: ${notSentLoads.length}`}</Box>
                            <Box _text={{ textAlign: 'center' }}>Conecte-se a internet para enviar</Box>
                        </>
                        :

                        <>
                            <Box _text={{ textAlign: 'center' }}>Enviando restantes...</Box>
                            <Box _text={{ textAlign: 'center' }}>{`Restam: ${notSentLoads.length}`}</Box>
                        </>
                    }
                </Box>
            }
        </>
    )
}
