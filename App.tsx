import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './src/PaymentScreen';

const App = () => {
  let PublicKey =
    'pk_test_51NDKmABoVTaXgprYu6DKe8APg3FWImYrGczeHUBT95u5FWYZTywpVQg6SQ4Dp1gWVaci62uf4GDbdmVHap5BYqdz00xCb2e1Gv';

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <StatusBar hidden />
      <StripeProvider publishableKey={PublicKey}>
        <PaymentScreen />
      </StripeProvider>
    </View>
  );
};

export default App;

// merchantIdentifier="merchant.identifier" // required for Apple Pay
// urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
