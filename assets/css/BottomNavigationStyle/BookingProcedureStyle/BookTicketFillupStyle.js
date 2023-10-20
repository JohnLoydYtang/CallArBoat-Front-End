import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Text:{
      marginBottom: '5%',
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 20,
    },
    textInputStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      width: 280,
      height: 60,
      overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,  
    },
    promptText: {
      marginRight: 10,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    dateInput: {
      marginBottom: 25, 
    },
    dropdownContainer:{
      backgroundColor: 'white',
      height: 60,
      width: 150, 
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,   
      marginTop: 5,
    },
    PickerTextStyle:{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,  
      marginBottom: 10,
      width: 280,
      height: 60,
      overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,  
        fontWeight: 'bold',
  
    },
    promptText: {
      marginRight: 10,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,  
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputName:{
      marginRight: 10,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    inputTextStyle:{
      marginRight: 10,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    ButtonDesign:{
      width: 211,
      height: 48,
      borderRadius: 10,  
      overflow: 'hidden',
        backgroundColor: '#4A79E5',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 6,
      marginTop: 10,
      marginBottom: 15,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      top: 10,
      fontSize: 19,
    },
    inputUploadStyle:{
      marginRight: 10,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    }
  });