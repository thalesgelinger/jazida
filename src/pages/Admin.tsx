import { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, useToast } from 'native-base'
import { Image } from 'react-native'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { RootStackParams } from '../router'
import truck from '../assets/truck.png'

import { FullLoader } from '../components/FullLoader'

type AdminProps = NativeStackScreenProps<RootStackParams, "Admin">

export const Admin = ({ navigation }: AdminProps) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const toast = useToast();

    const signIn = async () => {
        try {
            console.log({ process })

            const isNameValid = process.env.EXPO_PUBLIC_NAME == name

            if (!isNameValid) {
                toast.show({
                    description: "Nome inválido"
                })
                return
            }

            const isPasswordValid = process.env.EXPO_PUBLIC_PASSWORD == password
            if (!isPasswordValid) {
                toast.show({
                    description: "Senha inválido"
                })
                return
            }

            navigation.pop()
            navigation.navigate('NewLoad', {
                admin: true
            })
            return
        } catch (error) {
            navigation.pop()
            if (error.code === 'ERR_NETWORK') {
                toast.show({
                    backgroundColor: 'red.500',
                    placement: 'top',
                    description: 'Erro na internet'
                })
                return
            }

            toast.show({
                backgroundColor: 'red.500',
                placement: 'top',
                description: 'Erro ao logar'
            })
        } finally {
            setLoading(false)
        }

    }


    return (
        <Box flex={1} bgColor={"gray"} alignItems="center" justifyContent={'center'}>
            {loading && <FullLoader />}
            <Box mb={10}>
                <Image source={truck} alt="Caminhão" />
            </Box>
            <Input placeholder='Nome admin' onChangeText={setName} />
            <Input placeholder='Senha admin' onChangeText={setPassword} />
            <Button
                bgColor={'yellow'}
                _text={{ bold: true, color: 'black' }}
                onPress={signIn}
            >Entrar</Button>
        </Box>
    )
}
