
import { useNetInfo } from '@react-native-community/netinfo';
import { Box } from 'native-base'
import React, { useEffect, useState } from 'react'
import { isImportTypeNode } from 'typescript';
import { listenStorageKeys, sendMissingByKey } from '../services/loads';

export const NotSendedLoads = () => {
    const [notSendedLoads, setNotSendedLoads] = useState<string[]>([]);
    const { isInternetReachable } = useNetInfo()

    useEffect(() => {
        if (isInternetReachable) {
            sendMissingLoads()
        }
    }, [isInternetReachable])

    useEffect(() => {
        listenStorageKeys(loads => {
            setNotSendedLoads(loads)
        })
    }, [])

    const sendMissingLoads = async (loadsKeys = notSendedLoads) => {
        try {
            console.log({ loadsKeys })
            const key = loadsKeys.pop();
            console.log({ key })
            await sendMissingByKey(key);
            console.log({ loadsKeys })
            setNotSendedLoads(loadsKeys)
            if (loadsKeys.length > 0) {
                sendMissingLoads(loadsKeys)
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
