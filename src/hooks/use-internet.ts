import { useNetInfo } from "@react-native-community/netinfo"


export const useInternet = (): boolean => {
    const netInfo = useNetInfo()

    const hasInternet = netInfo.isWifiEnabled && netInfo.isInternetReachable
    return hasInternet
}
