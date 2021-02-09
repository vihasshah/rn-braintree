import * as React from 'react'

import { StyleSheet, View, Text, Button } from 'react-native'
import RnBraintree from 'rn-braintree'

const clientAccessToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTVRJNU5qRTJNelVzSW1wMGFTSTZJbU14TWpJek9EQmpMVFl6WldRdE5EQXpZeTFpTWpsaExXVTFORGt6Tm1JeU5qTmpZaUlzSW5OMVlpSTZJalp6TTJnNVkyUjJZelowYlhJMGFITWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pTm5NemFEbGpaSFpqTm5SdGNqUm9jeUlzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LlJxTE82QmZ2MXo2YVBZWmVqLUMzNEhCV3d4N3FxcFNLUjc5WEF2S0FxR3JEUjZfNmR5bmhfVzJCelVtLWk3bnJ4OEROdnNCRVpDcW4zRmxMZXRuMzVnIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzZzM2g5Y2R2YzZ0bXI0aHMvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvNnMzaDljZHZjNnRtcjRocy9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6IjZzM2g5Y2R2YzZ0bXI0aHMiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tLzZzM2g5Y2R2YzZ0bXI0aHMifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOmZhbHNlLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYWxsb3dIdHRwIjp0cnVlLCJkaXNwbGF5TmFtZSI6ImtyaXNodGVjaG5vbGFicyIsImNsaWVudElkIjoiQVJuaVh4cEthak1PVEJPT0JjeXhPZDVONTZ4YUZCdU9ycktZR2tTRzh4a2FwaXRQTy1MZ3NQQXF4YVRBNWNXMWlkc253TTg2NFlPTFYzeGoiLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJtZXJjaGFudEFjY291bnRJZCI6ImtyaXNodGVjaG5vbGFicyIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9fQ=="

export default function App() {
    const [result, setResult] = React.useState<number | undefined>()

    React.useEffect(() => {
        RnBraintree.multiply(3, 7).then(setResult);
        RnBraintree.setup(clientAccessToken)
    }, [])

    return (
        <View style={styles.container}>
            <Text>Result: {result}</Text>
            <View style={{ padding: 16 }}>
                <Button title="get Card Nounce" onPress={() => {
                    RnBraintree.getCardNounce({
                        cardNumber: '4111111111111111',
                        cardHolderName: 'TEST',
                        expiryMonth: '02',
                        expiryYear: '2028',
                        cardCvv: '123'
                    }).then((nonce) => {
                        console.log("NONCE ====> ", nonce)
                    }).catch((err) => {
                        console.log("err", err)
                    })
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
})
