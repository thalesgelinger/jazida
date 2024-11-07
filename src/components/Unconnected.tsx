import { Box } from "native-base";
import { useInternet } from "../hooks/use-internet";

export const Unconnected = () => {

    const hasInternet = useInternet()
    return (
        <>
            {!hasInternet && <Box
                backgroundColor={'red.500'}
                _text={{ textAlign: 'center', color: 'white' }}>
                Desconectado
            </Box>}
        </>
    )
}
