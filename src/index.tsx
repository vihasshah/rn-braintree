import { NativeModules } from 'react-native';

type RnBraintreeType = {
    multiply(a: number, b: number): Promise<number>,
    setup(clientToken: string): any,
    getCardNounce(card: Card): Promise<string>
};

type Card = {
    cardNumber: string,
    cardHolderName: string,
    expiryMonth: string,
    expiryYear: string,
    cardCvv: string
}

const { RnBraintree } = NativeModules;

export default RnBraintree as RnBraintreeType;
