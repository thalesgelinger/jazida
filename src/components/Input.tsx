import { Box, Input as NativeInput } from 'native-base'
import { IInputProps } from 'native-base/lib/typescript/components/primitives/Input/types'

export const Input = ({ ...rest }: IInputProps) => {
    return (
        <Box
            height={"45px"}
            width="full"
            maxWidth={'275px'}
            position="relative"
            rounded={"md"}
        >
            <NativeInput
                bgColor={"white"}
                height="full"
                width={"full"}
                zIndex={10}
                rounded={"md"}
                borderWidth={"2"}
                borderColor="black"
                alignItems="center"
                justifyContent={"center"}
                {...rest}
            />
            <Box
                bgColor={"black"}
                height="full"
                width={"full"}
                position="absolute"
                right={"-4"}
                bottom={"-4"}
                rounded={"md"}
            />
        </Box>
    )
}
