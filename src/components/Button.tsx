import { Box, Button as NativeButton, IButtonProps } from "native-base"

export const Button = ({ children, ...rest }: IButtonProps) => {
    return (
        <Box
            height={"45px"}
            width="full"
            maxWidth={'275px'}
            position="relative"
            rounded={"md"}
        >
            <NativeButton
                bgColor={"white"}
                height="full"
                width={"full"}
                zIndex={10}
                rounded={"md"}
                borderWidth={"2"}
                alignItems={'center'}
                _text={{
                    color: 'black'
                }}
                _pressed={{
                    right: '-4',
                    bottom: '-4',
                }}
                {...rest}
            >
                {children}
            </NativeButton>
            <Box bgColor={"black"} height="full" width={"full"} position="absolute" right={"-4"} bottom={"-4"} rounded={"md"} />
        </Box>

    )
}
