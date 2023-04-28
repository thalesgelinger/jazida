import { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Spinner, useToast } from 'native-base'
import { ActivityIndicator, Image } from 'react-native'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { RootStackParams } from '../router'
import truck from '../assets/truck.png'

import { adminSignIn, setLoginType } from '../services/admin'
import { FullLoader } from '../components/FullLoader'

type AdminProps = NativeStackScreenProps<RootStackParams, "Admin">

export const Admin = ({ navigation }: AdminProps) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const toast = useToast();

    const signIn = async () => {
        try {
            setLoading(true)
            await adminSignIn(name, password);
            setLoginType('admin')
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
