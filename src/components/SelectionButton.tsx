import { Box, FlatList, Flex, Icon, Modal, Pressable } from 'native-base'
import { AntDesign } from '@expo/vector-icons';
import { Button } from './Button'
import { Input } from './Input';
import { useReducer, useState } from 'react';

type SelectorProps = {
    title: string;
    onSelect: (option: any) => void
}
export const SelectionButton = ({ title, onSelect }: SelectorProps) => {
    const [show, toggle] = useReducer(s => !s, false)
    const [selected, setSelected] = useState<string>()
    const [options, setOptions] = useState([
        "João",
        "Cleber",
        "Taisson",
        "Epaminondas",
        "Junior",
    ])
    const [filter, setFilter] = useState('');

    const filteredOptions = options.filter(option => {
        return option.toLowerCase().includes(filter.toLowerCase())
    })

    const handleSelectedOption = (item: typeof options[0]) => () => {
        toggle();
        setSelected(item)
        onSelect(item)
    }

    return (
        <>
            <Button
                onPress={toggle}
                endIcon={!selected && <Icon
                    as={AntDesign}
                    name="right"
                    size="sm"
                    color={"black"}
                />}
            >
                {selected ?? title}
            </Button>
            <Modal
                isOpen={show}
                animationPreset="slide"
            >
                <Modal.Content
                    flex={1}
                    width={"full"}
                    height={"full"}
                    backgroundColor="gray"
                    marginBottom={0}
                    marginTop="auto"
                >
                    <Modal.Header
                        width={"full"}
                        flexDirection={"row"}
                        alignItems="center"
                        justifyContent={"space-around"}
                        bgColor="gray"
                    >
                        <Pressable onPress={toggle}>
                            <Icon as={AntDesign} name="arrowleft" size={"24px"} color="black" />
                        </Pressable>
                        <Input
                            onChangeText={setFilter}
                            InputRightElement={<Icon
                                as={AntDesign}
                                name="search1"
                                size={"24px"}
                                color="black"
                            />}
                        />
                    </Modal.Header>
                    <Modal.Body alignItems={'center'} height={'full'} >
                        <Flex>
                            <FlatList
                                height={"full"}
                                data={filteredOptions}
                                renderItem={({ item }) =>
                                    <Button
                                        minW={"270px"}
                                        onPress={handleSelectedOption(item)}
                                    >
                                        {item}
                                    </Button>
                                }
                                keyExtractor={(item) => item.toString()}
                                ItemSeparatorComponent={() => <Box height={"10px"} />}
                            />
                        </Flex>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </>
    )
}
