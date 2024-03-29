import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0EFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TicketContainer:{
        backgroundColor: '#4A79E5',
        width: '90%',
        height: '6%',
      },
      TicketDetails:{
        backgroundColor: 'white',
        width: '90%',
        height: '55%',
      },
      TicketQrCode:{
        borderTopColor: 'black',
        borderTopWidth: 4,
        borderStyle: 'dotted',
        backgroundColor: 'white',
        width: '90%',
        height: '35%',
        alignItems:'center',
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
      CompanyTitle:{
        transform: [{ rotate: '90deg'}],
        marginTop: 40,
        fontWeight: 'bold',
        marginLeft: 220,
        fontSize: 16,
        paddingBottom: 50,
      },
      Details:{
          transform: [{ rotate: '90deg'}],
          margin: 0,
      },
      NameDetails:{
        fontWeight: 'bold',
        bottom: 30,
        right:'4%',
      },
      VesselDetails:{
        fontWeight: 'bold',
        bottom: 20,
        right:'4%',
      },
      RouteDetails:{
        fontWeight: 'bold',
        bottom: 10,
        right:'4%',
      },
      SailDetails:{
        fontWeight: 'bold',
        right:'4%',
      },
      AccomDetails:{
        fontWeight: 'bold',
        top: 10,
        right:'4%',
      },
      SeatDetails:{
        fontWeight: 'bold',
        top: 20,
        right:'4%',
      },
      SexDetails:{
        fontWeight: 'bold',
        top: 20,
        right:'4%',
      },
      DateDetails:{
        transform: [{ rotate: '90deg'}],
        fontWeight: 'bold',
        marginLeft: 220,
        fontSize: 13,
        paddingBottom: 40,
      },
      AdditionalDetails:{
        transform: [{ rotate: '90deg'}],
      },
      FareDetails:{
        fontWeight: 'bold',
        bottom: '20%',
        left:'4%',
      },
      TicketTypeDetails:{
        fontWeight: 'bold',
        bottom: '15%',
      },
      DiscountDetails:{
        fontWeight: 'bold',
        bottom: '10%',
      },
      AppDetails:{
        fontWeight: 'bold',
      },
      TotalDetails:{
        fontWeight: 'bold',
        top: '10%',
      },
      PaidDetails:{
        color:'red',
        fontWeight: 'bold',
        top: 30,
      },
      QrCode:{
        transform: [{ rotate: '90deg'}],
        marginTop: 50,
        marginLeft: 210,
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 50,
      },
      image:{
        bottom: 100,
      },
      textQr:{
        transform: [{ rotate: '90deg'}],
        bottom:20,
      },
      qrImage:{
        left: '3%',
        transform: [{ rotate: '90deg'}],
        bottom:'38%',
        padding:'25%'
      }
});
