import { Box, FlatList, Flex, Icon, Modal, Pressable } from 'native-base'
import { AntDesign } from '@expo/vector-icons';
import { Button } from './Button'
import { Input } from './Input';
import { useReducer, useState } from 'react';

type SelectorProps = {
    title: string;
    value: string | undefined;
    onSelect: (idx: number) => void
    options: { id: number, value: string }[]
}
export const SelectionButton = ({ title, value, onSelect, options }: SelectorProps) => {
    const [show, toggle] = useReducer(s => !s, false)

    const [filter, setFilter] = useState('');

    const filteredOptions = options.filter(option => {
        return option.value.toLowerCase().includes(filter.toLowerCase())
    })

    const handleSelectedOption = (item: typeof options[0]) => () => {
        toggle();
        onSelect(item.id)
    }

    return (
        <>
            <Button
                onPress={toggle}
                endIcon={!value && <Icon
                    as={AntDesign}
                    name="right"
                    size="sm"
                    color={"black"}
                />}
            >
                {value ?? title}
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
                                        {item.value}
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
