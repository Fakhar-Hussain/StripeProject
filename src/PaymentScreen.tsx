import React, {useState} from 'react';
import {View, Text, processColor, TouchableOpacity, Alert} from 'react-native';
import {CardForm, createToken, confirmPayment} from '@stripe/stripe-react-native';
import axios from 'axios';

const PaymentScreen = () => {
  const [Card, setCard] = useState(null);

  const CardData = (details: any) => {
    if (details.complete == true) {
      setCard(details);
    } else {
      setCard(null);
    }
  };

  const CardDetails = async () => {
    let apiData = {
      amount: 3500,
      currency: "usd"
    }
    await axios.post('http://192.168.0.106:4000/payment', apiData)
    .then( (res:any) => {
      try {
        if (res?.data?.paymentIntent) {
          confirmPayment(res?.data?.paymentIntent , {paymentMethodType: "Card"})
          Alert.alert("Payment", "Payment Successfully")
        }
      } catch (error) {
        console.log("Error in card_details :" , error);
      }
    }).catch( (error:any) => {
      console.log("error :", error);
    })
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
      <Text
        style={{
          color: Card == null ? 'grey' : 'orange',
          fontSize: 18,
          alignSelf: 'center',
          top: -30,
          fontWeight: "bold",
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 7,
        }}>
        Payment Method
      </Text>

      <CardForm
        onFormComplete={(Details: any) => {
          CardData(Details);
        }}
        placeholders={{
          number: 'Card Number',
          expiration: 'Expiry Date',
        }}
        cardStyle={{
          placeholderColor: 'gray',
          textColor: 'black',
          textErrorColor: 'maroon',
        }}
        style={{height: 340, backgroundColor: '#fff'}}
      />

      <TouchableOpacity
        onPress={() => CardDetails()}
        disabled={Card == null ? true : false}
        style={{
          width: '80%',
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Card == null ? 'grey' : 'orange',
          alignSelf: 'center',
          borderRadius: 7,
        }}>
        <Text style={{color: '#fff'}}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;


    // if (Card !== null) {
    //   try {
    //     const resToken = await createToken({
    //       type: 'Card',
    //       name: 'Fakhar Hussain',
    //       currency: 'PKR',
    //     });
    //     console.log("resToken : ",resToken)
    //   }
    //   catch (error) {
    //     console.log("TokenError : ",error)
    //   }
    // }
