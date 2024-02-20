
import React, { useEffect, useState } from 'react'
import { useNetInfo } from '@react-native-community/netinfo';
import { Box } from 'native-base'
import { LoadType } from '../pages/NewLoad';
import { listenNotLoaded, saveLoad } from '../services/loads';

export const NotSendedLoads = () => {
    const { isInternetReachable } = useNetInfo()
    const [notSendedLoads, setNotSendedLoads] = useState<LoadType[]>([]);

    useEffect(() => {
        if (isInternetReachable) {
            sendMissingLoads()
        }
    }, [isInternetReachable])

    useEffect(() => {
        listenNotLoaded(loads => {
            console.log({ loads: JSON.stringify(loads, null, 2) })
            setNotSendedLoads(loads)
        })
    }, [])

    const sendMissingLoads = async () => {
        try {
            const load = notSendedLoads.pop();
            await saveLoad(load);
            await deleteFromLocalDB()
            setNotSendedLoads(notSendedLoads)
            if (notSendedLoads.length > 0) {
                sendMissingLoads()
            }
        } catch {
            return;
        }
    }


    return (
        <>
            {notSendedLoads.length > 0 &&
                <Box backgroundColor={"yellow"} borderTopWidth={1} borderBottomWidth={1}>
                    {!isInternetReachable ?
                        <>
                            <Box _text={{ textAlign: 'center' }}>{`Carregamentos não enviados: ${notSendedLoads.length}`}</Box>
                            <Box _text={{ textAlign: 'center' }}>Conecte-se a internet para enviar</Box>
                        </>
                        :

                        <>
                            <Box _text={{ textAlign: 'center' }}>Enviando restantes...</Box>
                            <Box _text={{ textAlign: 'center' }}>{`Restam: ${notSendedLoads.length}`}</Box>
                        </>
                    }
                </Box>}
        </>
    )
}
