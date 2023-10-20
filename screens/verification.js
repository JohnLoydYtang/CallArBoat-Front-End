import React, { useState, useRef } from 'react';
import { StatusBar, StyleSheet, KeyboardAvoidingView, Image, Text, TouchableOpacity, View, TextInput} from "react-native";
import { useRoute } from '@react-navigation/native';

//CSS
import styles from '../assets/css/screensStyle/verificationStyle';

const getVerification = require('../assets/images/verification.png');

const Verification = ({ navigation }) => {
  const route = useRoute();
  const phoneNumber = route.params?.phoneNumber;
  
    const [code, setCode] = useState('');
  const codeInputs = useRef([]);

  const handleCodeChange = (index, value) => {
    const newCode = code.split('');
    newCode[index] = value;
    setCode(newCode.join(''));

    if (value && index < codeInputs.current.length - 1) {
      codeInputs.current[index + 1].focus();
    }
  };
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container}>

        <View style={styles.imageContainer}>
            <Image source={getVerification}/>
        </View>

            <Text style={styles.TextCommon}>Verification Code</Text>
            <Text> Please Enter code sent {'\n'} to {phoneNumber}</Text>

            <View style={styles.LineContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (codeInputs.current[index] = ref)}
            style={styles.Lineinput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(value) => handleCodeChange(index, value)}
          />
        ))}
      </View>
        
            <StatusBar style="auto" />

            <TouchableOpacity style={styles.ButtonDesign} onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.text2}>Resend Code</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};
   
export default Verification;