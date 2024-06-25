import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, FlatList, Heading, Icon, Pressable } from 'native-base'
import { RootStackParams } from '../router';
import { AntDesign } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { getLoads } from '../services/loads';
import { LoadType } from './NewLoad';

type HistoryProps = NativeStackScreenProps<RootStackParams, 'History'>;

export const History = ({ navigation }: HistoryProps) => {
    const [loads, setLoads] = useState<(LoadType & { id: string })[]>([])

    useEffect(() => {
        getLoads().then(setLoads);
    }, [])

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
                <Heading>Histórico</Heading>
            </Box>


            <Box alignItems={'center'} justifyContent={'center'} w="full" h="full" >
                <Input
                    width={'full'}
                    InputRightElement={<Icon
                        as={AntDesign}
                        name="search1"
                        size={"24px"}
                        color="black"
                    />}
                />
                <FlatList
                    width="full"
                    data={loads}
                    _contentContainerStyle={{
                        alignItems: "center"
                    }}
                    renderItem={({ item, index }) =>
                        <Button key={index} width={"full"} height={'100px'} >
                            <Box flex={1} w="full" flexDir='row' justifyContent={'space-between'} >
                                <Box>
                                    {item.client}
                                </Box>
                                <Box>
                                    {item.plate}
                                </Box>
                            </Box>
                            <Box flex={1} flexDir='row' justifyContent={'space-between'}>
                                <Box>
                                    data
                                </Box>
                                <Box flexDir='row'>
                                    {item.material} - {item.quantity}
                                </Box>
                            </Box>
                        </Button>
                    }

                    ListFooterComponent={() => {
                        return <Box h={100} />
                    }}
                    keyExtractor={(item) => item.id}
                />
            </Box>

        </Box>
    )
}
