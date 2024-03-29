import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity , Pressable, Button, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from '@firebase/auth';
import { getFirestore, collection, doc, setDoc, Timestamp, firestore,serverTimestamp } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRoute } from '@react-navigation/native';

//CSS
import styles from '../../../assets/css/BottomNavigationStyle/BookingProcedureStyle/BookTicketFillupStyle';

const BookTicketFillup = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAgePicker, setShowAgePicker] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [gender, setGender] = useState('Male');
  const [selectedValueTicket, setSelectedValueTicket] = useState('Regular');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const uniqueId = Date.now();

  const [dob, setDob] = useState(new Date());


  const route = useRoute();
  const { item } = route.params;
  const vesselId = route.params.item.id;
  const vesselName = route.params.item.vessel_name;
  const routeName = route.params.item.route_name;
  const { companyItem } = route.params;
  const { vesselItem } = route.params;
  const { vesselBusiness } = route.params;
  console.log('vesselBusiness',vesselBusiness);

  const { vesselEconomy } = route.params;
  console.log('vesselEconomy',vesselEconomy);
  const {travelFareBusiness} = route.params;
  const {travelFareEconomy} = route.params;
  const [selectedValueAccom, setSelectedValueAccom] = useState(`ECONOMY: ₱${travelFareEconomy}`);

  const uploadImage = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, '/Medallion-BookedTicket/' + 'Valid-Id' + '-' + uniqueId);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          // You can use this to monitor the progress of the upload if you want
        }, 
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
    };
   
  
   const handleTicketFillup = async () => {
    setError('');
   
    if (name.trim() === '') {
      setError('Please input name');
      return;
    }
    if (dob === '') {
      setError('Please input age ');
      return;
    }
    if ((image || '').trim() === '') {
      setError('Please upload image ');
      return;
    }
    try {
      setIsLoading(true); // Set isLoading to true before starting the data saving process

      const auth = getAuth(); // Initialize the auth object
      const user = auth.currentUser; // Get the current user
  
      if (user) {
        const imageUrl = await uploadImage(image); // Upload the image and get the URL
   
        const usersCollection = collection(db, 'Medallion-BookedTicket');
        const firestoreDate = selectedDate; // Use the selectedDate value instead of creating a new Date object

        const calculateAge = (dob) => {
          const diff_ms = Date.now() - dob.getTime();
          const age_dt = new Date(diff_ms); 
         
          return Math.abs(age_dt.getUTCFullYear() - 1970);
         }

        const age = calculateAge(dob);
        console.log('age', age);
         
        let discount = 0;
        if (selectedValueTicket !== 'Regular') {
          discount = 20; // 20% discount for student, senior, and disabled tickets
        }
        
         // Create a new document reference with an auto-generated ID
        const docRef = doc(usersCollection);

        // Generate a unique ID
        const bookID = docRef.id;
        const paymentId = docRef.id;

        // Add a new document with a generated ID
        await setDoc(doc(usersCollection), {
          bookID: bookID,
          paymentId: paymentId,
          user: user.uid,
          Date: firestoreDate,
          dateIssued: serverTimestamp(),// Automatically save the current date as the date-issued
          Location: item.route_location,
          Destination: item.route_destination,
          Name: name,
          Age: age,
          Gender: gender,
          AccomType: selectedValueAccom,
          TicketType: selectedValueTicket,
          ImageUrl: imageUrl, // Save the image URL in Firestore
          vesselId: vesselId, // Save the Vessel id in Firestore
          vesselName: vesselName,
          routeName: routeName, // Save the route name in Firestore
          status: "pending", // Add the status field with the value "pending"
          Accom: "ECONOMY",
          Accom1: "BUSINESS",
          Discount: discount, // Save the discount value in the document
          companyName: companyItem.companyName, // Store only the companyName from companyItem
        });
   
        const firestoreDateString = firestoreDate.toISOString();

        navigation.navigate('PaymentProcess', {    
          user: user.uid,      
          Name: name,
          Age: age,
          Gender: gender,
          AccomType: selectedValueAccom,
          TicketType: selectedValueTicket,
          Discount: discount, // Pass the discount value as a prop
          item: item,
          Date: firestoreDateString,
          companyItem: companyItem,
          paymentId: paymentId,
          travelFareBusiness: travelFareBusiness,
          travelFareEconomy: travelFareEconomy,
        });

         console.log('Success Saving Data');
      } else {
        setError('User not authenticated');
      }
    } catch (error) {
      console.log(error);
      setMessageError('Error Booking');
    } finally {
      setIsLoading(false); // Set isLoading back to false after the data saving process is complete
    }
   };
  
   const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };
  


  const handleNameChange = (text) => {
    setName(text);
  };

  const handleAgeChange = (event, date) => {
    setShowAgePicker(false);
    if (date) {
    setDob(date);
    }
  };

  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const handleDestinationChange = (text) => {
    setDestination(text);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.Text}>Fill up your ticket details:</Text>
            {error !== '' && <Text style={styles.error}>{error}</Text>}
              <View style={styles.textInputStyle}>
              <Text style={styles.promptText}>Sail Date:</Text>
                  <Pressable onPress={() => setShowDatePicker(true)}>
                    <Icon name="calendar" size={30} marginLeft={130} top={20} color="black" />
                    <TextInput
                      value={selectedDate.toDateString()} // Display the selected date in the TextInput
                      editable={false} // Disable direct editing of the TextInput
                      style={styles.dateInput} // Add the style here
                    />
                  </Pressable>
                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      minimumDate={new Date()} // Set minimumDate to the current date to prevent past dates
                      onChange={handleDateChange}
                    />
                  )}
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputTextStyle}>Location:</Text>
                    <TextInput
                      value={item.route_location}
                      onChangeText={handleLocationChange}
                      editable={false}
                    />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputTextStyle}>Destination:</Text>
                    <TextInput
                      value={item.route_destination}
                      onChangeText={handleDestinationChange}
                      editable={false}
                    />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputName}>Name:</Text>
                  <TextInput
                    placeholder="Input your name                                         "
                    value={name}
                    onChangeText={handleNameChange}
                  />
                </View>
              </View>

              <View style={styles.rowContainer}>
              <View style={styles.textInputStyle}>
                  <Text style={styles.inputName}>Date of Birth:</Text>
                  <Pressable onPress={() => setShowAgePicker(true)}>
                    {/* <Icon name="calendar" size={30} marginLeft={130} top={20} color="black" /> */}
                    <TextInput
                      value={dob.toDateString()} // Display the selected date in the TextInput
                      editable={false} // Disable direct editing of the TextInput
                    />
                  </Pressable>
                  {showAgePicker && (
                    <DateTimePicker
                      value={dob}
                      mode="date"
                      maximumDate={new Date()} // Set minimumDate to the current date to prevent past dates
                      onChange={handleAgeChange}
                    />
                  )}
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                <Text style={styles.inputTextStyle}>Gender:</Text>
                  <View style={styles.dropdownContainer}>
                  <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)}>
                    <Picker.Item label="MALE" value="Male"/>
                    <Picker.Item label="FEMALE" value="Female"/>
                  </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                  <Text style={styles.inputTextStyle}>Accom Type:</Text>

                  <View style={styles.dropdownContainer}>
                  <Picker
                      selectedValue={selectedValueAccom}
                      onValueChange={(itemValue) => {
                        if (itemValue !== "Capacity Full") {
                          setSelectedValueAccom(itemValue);
                        }
                      }}
                      enabled={vesselBusiness > 0 || vesselEconomy > 0} // Enable if at least one capacity is greater than 0
                    >
                      {vesselEconomy > 0 ? (
                        <Picker.Item
                          label={`ECONOMY: ₱${travelFareEconomy} | Capacity = ${vesselEconomy}`}
                          value={`ECONOMY: ₱${travelFareEconomy}`}
                        />
                      ) : (
                        <Picker.Item label="ECONOMY Capacity Full" value="Capacity Full" />
                      )}

                      {vesselBusiness > 0 ? (
                        <Picker.Item
                          label={`BUSINESS: ₱${travelFareBusiness} | Capacity = ${vesselBusiness}`}
                          value={`BUSINESS: ₱${travelFareBusiness}`}
                        />
                      ) : (
                        <Picker.Item label="BUSINESS Capacity Full" value="Capacity Full" />
                      )}
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                <Text style={styles.inputTextStyle}>Ticket Type:</Text>
                  <View style={styles.dropdownContainer}>
                    <Picker selectedValue={selectedValueTicket} onValueChange={(itemValue) => setSelectedValueTicket(itemValue)}>
                    <Picker.Item label="REGULAR" value="Regular"/>
                      <Picker.Item label="STUDENT (20%)" value="Student"/>
                      <Picker.Item label="SENIOR (20%)" value="Senior"/>
                      <Picker.Item label="DISABLED (20%)" value="Disabled"/>
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                  <Text style={styles.inputUploadStyle}>Upload ID:</Text>
                  <Button title="Upload" onPress={pickImage} />
                  {image && <Image source={{ uri: image }} style={{ marginLeft: 10, width: 200, height: 200 }} />}
                </View>
              </View>

          <TouchableOpacity style={styles.ButtonDesign} onPress={handleTicketFillup} disabled={isLoading}>
          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="medium" color="white" />
            </View>
            ) : (            
              <Text style={styles.buttonText}>Proceed</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      );      
};

export default BookTicketFillup;