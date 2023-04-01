import { Box, Button } from "native-base";
import { useEffect, useState } from "react";

type OptionProps = {
    onOption: (option: string) => void
}
export const Option = ({ onOption }: OptionProps) => {
    const [selected, setSelected] = useState<'cash' | 'term'>('cash')

    useEffect(() => {
        onOption(selected)
    }, [])

    const toggle = (selected: 'cash' | 'term') => () => {
        setSelected(selected)
        onOption(selected)
    }

    return (

        <Box
            height={"45px"}
            width="full"
            maxWidth={'275px'}
            position="relative"
            rounded={"md"}
            m={"16px"}
        >
            <Button.Group isAttached
                height={"45px"}
                width="full"
                maxWidth={'275px'}
                position="relative"
                rounded={"md"}

                bgColor={"white"}
                zIndex={10}
                borderWidth={"2"}
                alignItems={'center'}
                _text={{
                    color: 'black'
                }}
            >
                <Button
                    flex={1}
                    bgColor={selected === 'cash' ? "yellow" : 'white'}
                    _text={{
                        color: 'black'
                    }}
                    onPress={toggle('cash')}
                >
                    Á vista
                </Button>
                <Button
                    flex={1}
                    bgColor={selected === 'term' ? "yellow" : 'white'}
                    _text={{
                        color: 'black'
                    }}
                    onPress={toggle('term')}
                >
                    Á prazo
                </Button>
            </Button.Group>
            <Box bgColor={"black"} height="full" width={"full"} position="absolute" right={"-4"} bottom={"-4"} rounded={"md"} />
        </Box>

    )
}
