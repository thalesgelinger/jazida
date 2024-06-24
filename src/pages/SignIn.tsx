import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box } from 'native-base'
import { useEffect } from 'react'
import { Image } from 'react-native'
import truck from '../assets/truck.png'
import { Button } from '../components/Button'
import { RootStackParams } from '../router'
import { getLoginType, setLoginType } from '../services/admin'

type SignInProps = NativeStackScreenProps<RootStackParams, "SignIn">

export const SignIn = ({ navigation }: SignInProps) => {

    useEffect(() => {
        getLoginType().then(loginType => {
            if (!!loginType) {
                navigation.navigate('NewLoad', {
                    admin: loginType === 'admin'
                })
            }
        });

    }, [])


    const signInAdmin = () => {
        navigation.navigate('Admin')
    }

    const signInLoader = () => {
        setLoginType('loader')
        navigation.navigate('NewLoad')
    }

    return (
        <Box flex={1} bgColor={"gray"} alignItems="center" justifyContent={'center'}>
            <Box mb={10}>
                <Image source={truck} alt="Caminhão" />
            </Box>
            <Button
                bgColor={'yellow'}
                _text={{ bold: true, color: 'black' }}
                onPress={signInLoader}
            >Entrar como Carregador</Button>
            <Button
                bgColor={'yellow'}
                _text={{ bold: true, color: 'black' }}
                onPress={signInAdmin}
            >Entrar como Admin</Button>
        </Box>
    )
}
