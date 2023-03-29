import { Box, Flex, Heading, } from "native-base"
import { SelectionButton } from "../components/SelectionButton"
import { Input } from "../components/Input"
import { Option } from "../components/Option"
import { Button } from "../components/Button"
import { Signature } from "../components/Signature"

export const NewLoad = () => {
    return (
        <Box flex={1} bgColor={"gray"}>
            <Box
                backgroundColor={"yellow"}
                height={"80px"}
                width={"full"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Heading>Carregar</Heading>
            </Box>
            <Flex
                alignItems={'center'}
                flex="1"
                width="full"
                justifyContent={"space-around"}
            >
                <SelectionButton title="Selecione o Cliente" />
                <SelectionButton title="Selecione a Placa" />
                <SelectionButton title="Selecione o Material" />
                <Input placeholder={"Digite a quantidade"} keyboardType="numeric" />
                <Option />
                <Signature />
                <Button
                    bgColor={"yellow"}
                    _text={{
                        bold: true,
                        color: 'black'
                    }}
                >
                    Confirmar
                </Button>
            </Flex>
        </Box>
    )
}
