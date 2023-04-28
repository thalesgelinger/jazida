import { useNetInfo } from "@react-native-community/netinfo";
import { Box } from "native-base";


export const Unconnected = () => {

    const { isInternetReachable } = useNetInfo();
    return (
        <>
            {!isInternetReachable && <Box
                backgroundColor={'red.500'}
                _text={{ textAlign: 'center', color: 'white' }}>
                Desconectado
            </Box>}
        </>
    )
}
