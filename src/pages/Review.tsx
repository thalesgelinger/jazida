import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Flex, Heading, Icon, Image, Pressable, Text } from 'native-base'
import { RootStackParams } from '../router';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '../components/Button';


type ReviewProps = NativeStackScreenProps<RootStackParams, 'Review'>;

export const Review = ({ route, navigation }: ReviewProps) => {
    const load = route.params.load

    const send = () => {

    }

    return (
        <Box h="full" bgColor={"gray"}>
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
                        <Heading textAlign={'center'}> {load.client} </Heading>

                        <Text>
                            Placa: {"\n"}
                        </Text>
                        <Heading textAlign={'center'}> {load.plate} </Heading>

                        <Text>
                            Material: {"\n"}
                        </Text>
                        <Heading textAlign={'center'}> {load.material} </Heading>
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
