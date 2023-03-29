import { Box, Icon, Modal, Pressable } from 'native-base'
import { AntDesign } from '@expo/vector-icons';
import { Button } from './Button'
import { ElementRef, useReducer, useRef, useState } from 'react';
import SignatureScreen from 'react-native-signature-canvas';

export const Signature = () => {
    const [show, toggle] = useReducer(s => !s, false);
    const [signatureHeight, setSignatureHeight] = useState(0)
    const ref = useRef<ElementRef<typeof SignatureScreen>>();

    const handleEnd = () => {
        console.log("handleEnd")
        ref.current.readSignature();
    };

    const handleData = (data) => {
        console.log("handleData")
        toggle()
        console.log(data);
    };


    return (
        <>

            <Button
                onPress={toggle}
                endIcon={<Icon
                    as={AntDesign}
                    name="right"
                    size="sm"
                    color={"black"}
                />}
            >
                Assinar
            </Button>
            <Modal isOpen={show} animationPreset={'slide'}>
                <Modal.Content h="full" w="full">

                    <Pressable
                        onPress={toggle}
                        position="absolute"
                        zIndex={10}
                        left={4}
                        top={4}
                    >
                        <Icon as={AntDesign} name="arrowleft" size={"24px"} color="gray" />
                    </Pressable>
                    <Box h="full" w="full" onLayout={(e) => setSignatureHeight(e.nativeEvent.layout.height)}>
                        <SignatureScreen
                            ref={ref}
                            descriptionText={"TEXTO DE descriptionText"}
                            webStyle={` 
                                .m-signature-pad {
                                    margin:0;
                                    box-shadow: none; 
                                    width:100%;
                                    height: ${signatureHeight}px;
                                } 
                                .m-signature-pad--footer {
                                    display: none; 
                                    margin: 0px;
                                    height: 0;
                                }
                            `}
                        />
                    </Box>
                    <Box
                        h={"4px"}
                        w={"90%"}
                        bgColor="gray"
                        position={'absolute'}
                        bottom={signatureHeight / 3}
                        right={'5%'}
                    />

                    <Box
                        flex={1}
                        alignItems="center"
                        justifyContent={'center'}
                        position='absolute'
                        bottom={10}
                        w="full"
                    >
                        <Button bgColor={'yellow'} onPress={handleData}>Salvar</Button>
                    </Box>
                </Modal.Content>

            </Modal>
        </>
    )
}
