import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, ActivityIndicator, RefreshControl } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../AuthContext';
import {db} from '../firebaseConfig';
import { collection, getDocs, where, query  } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from '@firebase/auth';

//CSS
import styles from '../assets/css/BottomNavigationStyle/HistoryStyle';

const History = ({navigation}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [Transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Medallion, setMedallion] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  console.log('isAuthenticated:', isAuthenticated);

  const [selectedValue, setSelectedValue] = useState('Latest');

  // useEffect(() => {  
  //   const auth = getAuth();
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       const userId = user.uid;
  //       const NotifRef = collection(db, 'Medallion-BookedTicket');
  //       const MedallionRef = collection(db, 'Medallion');

  //       const q = query(NotifRef, where('user', '==', userId));
    
  //       getDocs(q)
  //         .then((snapshot) => {
  //           let Transaction = []
  //           snapshot.docs.forEach((doc) => {
  //             Transaction.push({ ...doc.data(), id:doc.id })
  //           })
  //           setTransaction(Transaction);
  //           setLoading(false);
  //           if (Transaction.length === 0) {
  //             console.log('No matching documents found in Firestore');
  //           }
  //         })
  //         .catch(err => {
  //           console.log(err.message)
  //           setLoading(false);
  //         })

  //         //Fetch image from medallion
  //         getDocs(MedallionRef)
  //         .then((snapshot) => {
  //           let Medallion = []
  //           snapshot.docs.forEach((doc) => {
  //             const data = doc.data();
  //             Medallion.push({ id: doc.id, image: data.image, Price: data.Price })
  //           })
  //           console.log('Fetched Medallion:', Medallion);  // Log the fetched Medallion data
  //           setMedallion(Medallion);
  //         })
  //         .catch(err => {
  //           console.log('Error fetching Medallion:', err.message)  // Log any error messages
  //         })    
  //         //End of medallion
  //     } else {
  //       console.log('User not logged in');
  //       setLoading(false);
  //     }
  //   });

  //   // Unsubscribe from the listener when the component unmounts
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const NotifRef = collection(db, 'Medallion-BookedTicket');
        const MedallionRef = collection(db, 'Medallion');

        const q = query(NotifRef, where('user', '==', userId));

        getDocs(q)
          .then((snapshot) => {
            let Transaction = []
            snapshot.docs.forEach((doc) => {
              Transaction.push({ ...doc.data(), id: doc.id })
            })
            setTransaction(Transaction);
            setLoading(false);
            if (Transaction.length === 0) {
              console.log('No matching documents found in Firestore');
            }
          })
          .catch(err => {
            console.log(err.message)
            setLoading(false);
          })

        //Fetch image from medallion
        getDocs(MedallionRef)
          .then((snapshot) => {
            let Medallion = []
            snapshot.docs.forEach((doc) => {
              const data = doc.data();
              Medallion.push({ id: doc.id, image: data.image, Price: data.Price })
            })
            console.log('Fetched Medallion:', Medallion);  // Log the fetched Medallion data
            setMedallion(Medallion);
          })
          .catch(err => {
            console.log('Error fetching Medallion:', err.message)  // Log any error messages
          })
        //End of medallion
      } else {
        console.log('User not logged in');
        setLoading(false);
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };
  const filterByDate = (selectedValue) => {
    // Logic to filter the data based on the selected value
    if (selectedValue === 'Latest') {
      // Filter the data to show the latest dates
    } else if (selectedValue === 'Old') {
      // Filter the data to show the oldest dates
    }
  };
  
  
  if (loading) {
    return (    
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>);
  }
  //END OF DISPLAY

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
      <Picker
        prompt='Filter Date'
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
          filterByDate(itemValue);
        }}
      >
        <Picker.Item label="Latest" value="Latest" />
        <Picker.Item label="Old" value="Old" />
      </Picker>
      </View>
      <ScrollView style={styles.scrollView}refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>       
    {console.log('Transaction:', Transaction)}
       {Transaction.map((item, index) => {
          // Find the corresponding Medallion document
          const medallion = Medallion.find(m => m.id === item.MedallionId);
          // If the Medallion document exists, use its image
          const medallionImage = medallion?.image;
          const medallionPrice = medallion?.Price;
          console.log('Medallion:', medallion);
          console.log('Medallion Image:', medallionImage);

          const date = item.Date.toDate();
          // Format the Date object as a string
          const dateString = date.toLocaleDateString();

          return (
            <TouchableOpacity key={index} style={styles.Transaction} onPress={() => navigation.navigate('TicketTransaction', {item, medallionImage, medallionPrice})}>
              <View style={styles.TransactionContent}>
              {medallionImage ? 
            <Image source={{uri: medallionImage}} style={styles.image}/> : 
            <Text>No image</Text>
               }
                <View style={styles.textContainer}>
                  <Text style={styles.TransactionName}>{item.Destination}</Text>
                  <Text style={styles.TransactionDesc}>{item.AccomType}</Text>
                  <Text style={styles.dateText}>Date: {dateString}</Text>
                  {item.scanned ? <Text style={styles.scannedText}>Scanned</Text> : <Text style={styles.notScannedText}>Not Scanned</Text>} 
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
     </ScrollView>
    </View>
  );
};

export default History;