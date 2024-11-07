import { useEffect, useState } from "react"
import { Box, Heading, Icon, Pressable, ScrollView, Text } from "native-base"
import { SelectionButton } from "../components/SelectionButton"
import { Input } from "../components/Input"
import { Option } from "../components/Option"
import { Button } from "../components/Button"
import { Signature } from "../components/Signature"
import * as FileSystem from "expo-file-system";
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParams } from "../router"
import { AntDesign } from '@expo/vector-icons';
import { Unconnected } from "../components/Unconnected"
import { NotSentLoads } from "../components/NotSentLoads"
import { useResources } from "./useResorces"

type NewLoadProps = NativeStackScreenProps<RootStackParams, 'NewLoad'>;

export type LoadType = {
    clientId: number,
    plateId: number,
    materialId: number,
    quantity: string,
    paymentMethod: PaymentMethod,
    signature: FileSystem.FileInfo
}

export type PaymentMethod = "CASH" | "INSTALLMENT"

export const NewLoad = ({ navigation, route }: NewLoadProps) => {
    const [clientId, setClientId] = useState<number>()
    const [plateId, setPlateId] = useState<number>()
    const [materialId, setMaterialId] = useState<number>()
    const [quantity, setQuantity] = useState('')
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH')
    const [signature, setSignature] = useState<FileSystem.FileInfo | null>()

    const canConfirm = !!clientId && !!plateId && !!materialId && !!quantity && !!paymentMethod && !!signature;

    const { clients, materials } = useResources()

    const clientsOptions = clients.map(c => ({ id: c.id, value: c.name }))
    const platesOptions = clients.find(c => c.id === clientId)?.plates.map(p => ({ id: p.id, value: p.plate })) ?? []
    const materialOptions = materials.map(m => ({ id: m.id, value: m.name }))

    const handleConfirm = () => {
        const load = {
            clientId,
            plateId,
            materialId,
            quantity,
            paymentMethod,
            signature
        }
        cleanStates()
        navigation.push("Review", { load })
    }

    const cleanStates = () => {
        setClientId(-1)
        setPlateId(-1)
        setMaterialId(-1)
        setQuantity('')
        setSignature(null)
    }


    const goToLoadings = () => {
        navigation.navigate("History")
    }

    const handleGoOut = () => {
        navigation.goBack()
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
                    onPress={handleGoOut}
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

            <Unconnected />
            <NotSentLoads />


            <ScrollView
                h="full"
                w="full"
                _contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: "space-between",
                }}
            >
                <SelectionButton
                    title="Selecione o Cliente"
                    value={clients.find(c => c.id === clientId)?.name}
                    onSelect={setClientId}
                    options={clientsOptions} />
                <SelectionButton
                    title="Selecione a Placa"
                    value={clients.find(c => c.id === clientId)?.plates.find(p => p.id === plateId)?.plate}
                    onSelect={setPlateId}
                    options={platesOptions} />
                <SelectionButton
                    title="Selecione o Material"
                    value={materialOptions.find(m => m.id === materialId)?.value}
                    onSelect={setMaterialId}
                    options={materialOptions} />
                <Input
                    placeholder={"Digite a quantidade"}
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={setQuantity} />
                <Option onOption={setPaymentMethod} />
                <Signature onFileSave={setSignature} signature={signature} />


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
