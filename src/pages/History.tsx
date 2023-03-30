import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, FlatList, Heading, Icon, Pressable } from 'native-base'
import { RootStackParams } from '../router';
import { AntDesign } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

type HistoryProps = NativeStackScreenProps<RootStackParams, 'History'>;

export const History = ({ navigation }: HistoryProps) => {
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


            <Box alignItems={'center'} justifyContent={'center'} w="full">
                <Input
                    InputRightElement={<Icon
                        as={AntDesign}
                        name="search1"
                        size={"24px"}
                        color="black"
                    />}
                />
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7]}
                    renderItem={({ item }) => <Button>Hello</Button>}
                    keyExtractor={(item) => item.toString()}
                />
            </Box>

        </Box>
    )
}
