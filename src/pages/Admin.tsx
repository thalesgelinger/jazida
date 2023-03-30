import { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box } from 'native-base'
import { Image } from 'react-native'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { RootStackParams } from '../router'
import truck from '../assets/truck.png'

type AdminProps = NativeStackScreenProps<RootStackParams, "Admin">

export const Admin = ({ navigation }: AdminProps) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const signIn = () => {
        console.log({
            name, password
        })
        navigation.pop()
        navigation.navigate('NewLoad', {
            admin: true
        })
    }

    return (
        <Box flex={1} bgColor={"gray"} alignItems="center" justifyContent={'center'}>
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
