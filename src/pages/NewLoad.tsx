import { useState } from "react"
import { Box, Flex, Heading, Icon, Pressable, ScrollView, Text, } from "native-base"
import { SelectionButton } from "../components/SelectionButton"
import { Input } from "../components/Input"
import { Option } from "../components/Option"
import { Button } from "../components/Button"
import { Signature } from "../components/Signature"
import * as FileSystem from "expo-file-system";
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParams } from "../router"
import { AntDesign } from '@expo/vector-icons';

type NewLoadProps = NativeStackScreenProps<RootStackParams, 'NewLoad'>;

export type LoadType = {
    client: string,
    plate: string,
    material: string,
    quantity: string,
    paymentMethod: string,
    signature: FileSystem.FileInfo
}

export const NewLoad = ({ navigation, route }: NewLoadProps) => {
    const [client, setClient] = useState('')
    const [plate, setPlate] = useState('')
    const [material, setMaterial] = useState('')
    const [quantity, setQuantity] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [signature, setSignature] = useState<FileSystem.FileInfo>()

    const canConfirm = !!client && !!plate && !!material && !!quantity && !!paymentMethod && !!signature;

    const handleConfirm = () => {
        const load = {
            client,
            plate,
            material,
            quantity,
            paymentMethod,
            signature
        }
        navigation.push("Review", { load })
    }

    const goToLoadings = () => {
        navigation.navigate("History")
    }

    return (
        <Box flex={1} bgColor={"gray"}>
            <Box
                backgroundColor={"yellow"}
                height={"80px"}
                width={"full"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Pressable
                    onPress={navigation.goBack}
                    position="absolute"
                    zIndex={10}
                    left={4}
                    alignItems="center"
                    justifyContent={"center"}
                >
                    <Icon as={AntDesign} name="arrowleft" size={"24px"} color="black" />
                </Pressable>
                <Heading>Carregar</Heading>
                {route.params?.admin && <Pressable
                    onPress={goToLoadings}
                    position="absolute"
                    zIndex={10}
                    right={4}
                    alignItems="center"
                    justifyContent={"center"}
                >
                    <Text>Histórico</Text>
                </Pressable>}
            </Box>
            <ScrollView
                h="full"
                w="full"
                _contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: "space-between",
                }}
            >
                <SelectionButton title="Selecione o Cliente" onSelect={setClient} />
                <SelectionButton title="Selecione a Placa" onSelect={setPlate} />
                <SelectionButton title="Selecione o Material" onSelect={setMaterial} />
                <Input
                    placeholder={"Digite a quantidade"}
                    keyboardType="numeric"
                    onChangeText={setQuantity} />
                <Option onOption={setPaymentMethod} />
                <Signature onFileSave={setSignature} />


            </ScrollView>
            <Box w="full" alignItems={'center'}>
                <Button
                    bgColor={"yellow"}
                    _text={{
                        bold: true,
                        color: 'black'
                    }}
                    opacity={canConfirm ? 1 : 0.6}
                    right={canConfirm ? 0 : -4}
                    bottom={canConfirm ? 0 : -4}
                    disabled={!canConfirm}
                    onPress={handleConfirm}
                >
                    Confirmar
                </Button>
            </Box>
        </Box>
    )
}
