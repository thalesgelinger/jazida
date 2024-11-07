import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Flex, Heading, Icon, Image, Pressable, Text } from 'native-base'
import { RootStackParams } from '../router';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { saveLoad } from '../services/loads';
import { Unconnected } from '../components/Unconnected';
import { NotSentLoads } from '../components/NotSentLoads';
import { useState } from 'react';
import { FullLoader } from '../components/FullLoader';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as loadSchema from '../database/schema';
import { useResources } from './useResorces';
import { useInternet } from '../hooks/use-internet';
import { useNotSentLoads } from '../hooks/use-not-sent-loads';


type ReviewProps = NativeStackScreenProps<RootStackParams, 'Review'>;

export const Review = ({ route, navigation }: ReviewProps) => {
    const load = route.params.load

    const [loading, setLoading] = useState(false)

    const database = useSQLiteContext()
    const db = drizzle(database, { schema: loadSchema })

    const { clients, materials } = useResources()

    const client = clients.find(c => c.id === load.clientId).name
    const plate = clients.find(c => c.id === load.clientId).plates.find(p => p.id === load.plateId).plate
    const material = materials.find(m => m.id === load.materialId).name

    const hasInternet = useInternet()

    const { fetchLocalNotSent } = useNotSentLoads()

    const send = async () => {
        setLoading(true)
        try {
            if (hasInternet) {
                await saveLoad(load)
            } else {
                const newLoad = {
                    id: Date.now().toString(),
                    plateId: load.plateId,
                    clientId: load.clientId,
                    materialId: load.materialId,
                    quantity: load.quantity,
                    paymentMethod: load.paymentMethod,
                    signaturePath: load.signature.uri
                }
                console.log("storing on device", newLoad)
                await db.insert(loadSchema.load).values(newLoad)
                fetchLocalNotSent()
            }

        } catch (e) {
            console.log(e.response.data)
        } finally {
            setLoading(false)
            navigation.goBack()
        }
    }

    return (
        <Box h="full" bgColor={"gray"}>
            {loading && <FullLoader />}
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
                <Heading>Revisar</Heading>
            </Box>
            <Unconnected />
            <NotSentLoads />
            <Flex alignItems={"center"} h="full" flex={1}>

                <Box
                    width="full"
                    maxWidth={'275px'}
                    position="relative"
                    rounded={"md"}
                    m={"16px"}
                >
                    <Box
                        bgColor={"white"}
                        height="full"
                        width={"full"}
                        zIndex={10}
                        rounded={"md"}
                        borderWidth={"2"}
                        p={"10px"}
                        _text={{
                            color: 'black'
                        }}
                    >
                        <Text>
                            Cliente: {"\n"}
                        </Text>
                        <Heading textAlign={'center'}> {client} </Heading>

                        <Text>
                            Placa: {"\n"}
                        </Text>
                        <Heading textAlign={'center'}> {plate} </Heading>

                        <Text>
                            Material: {"\n"}
                        </Text>
                        <Heading textAlign={'center'}> {material} </Heading>
                        <Text>
                            Quantidade: {"\n"}
                        </Text>
                        <Heading textAlign={'center'}> {load.quantity} </Heading>

                        <Text>
                            Método de pagamento: {"\n"}
                        </Text>

                        <Heading textAlign={'center'}> {load.paymentMethod} </Heading>
                        <Text>
                            Assinatura: {'\n'}
                        </Text>
                        <Image
                            alignSelf={'center'}
                            source={{
                                uri: load.signature.uri
                            }}
                            alt="Assinatura"
                            height={'200px'}
                            width={'200px'}
                        />
                    </Box>
                    <Box
                        bgColor={"black"}
                        height="full"
                        width={"full"}
                        position="absolute"
                        right={"-4"}
                        bottom={"-4"}
                        rounded={"md"} />
                </Box>
            </Flex>
            <Box alignItems={'center'}>
                <Button bgColor={'yellow'} onPress={send}>Enviar</Button>
            </Box>
        </Box>
    )

}
