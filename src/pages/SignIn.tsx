import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box } from 'native-base'
import { Image } from 'react-native'
import { useQuery } from 'react-query'
import { adminSignIn } from '../../functions/lib'
import truck from '../assets/truck.png'
import { Button } from '../components/Button'
import { RootStackParams } from '../router'

type SignInProps = NativeStackScreenProps<RootStackParams, "SignIn">

export const SignIn = ({ navigation }: SignInProps) => {


    const signInAdmin = () => {
        navigation.navigate('Admin')
    }

    const signInLoader = () => {
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
