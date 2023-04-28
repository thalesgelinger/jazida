import { Spinner } from 'native-base'
import React from 'react'

export const FullLoader = () => {
    return (
        <Spinner
            size={100}
            position='absolute'
            zIndex={10}
            backgroundColor="rgba(167, 162, 158, 0.4)"
            h={"full"}
            w="full"
            color="yellow"
        />
    )
}
