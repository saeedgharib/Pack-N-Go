// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const PackageOrder = () => {

//   const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
//   const [formData, setFormData] = useState({

//     pickupAddress: '',
//     dropoffAddress: '',
//     moveDate: '',
//     moveTime: '',

//   });

//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       setCurrentLocation(location);
//     })();
//   }, []);

//   const handleInputChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     console.log(formData);
//   };

//   return (

// <>

//         <GooglePlacesAutocomplete
//           placeholder="Pickup Address"
//           onPress={(data, details = null) => {
//             handleInputChange('pickupAddress', data.description);
//             console.log(data, details);
//           }}
//           query={{
//             key: GOOGLE_API_KEY, // Replace with your Google API Key
//             language: 'en',
//           }}

//           styles={{
//             textInput: styles.input,
//           }}
//         />

//       <GooglePlacesAutocomplete
//           placeholder="Drop-off Address"
//           onPress={(data, details = null) => {
//             handleInputChange('dropoffAddress', data.description);
//           }}
//           query={{
//             key: GOOGLE_API_KEY, // Replace with your Google API Key
//             language: 'en',
//           }}
//           styles={{
//             textInput: styles.input,
//           }}
//         />
// </>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   imagePicker: {
//     marginBottom: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     height: 200,
//     width: '100%',
//   },
//   image: {
//     height: '100%',
//     width: '100%',
//     resizeMode: 'cover',
//   },
//   imagePlaceholder: {
//     color: '#aaa',
//     textAlign: 'center',
//     lineHeight: 200,
//   },
// });

// export default PackageOrder;

// import React from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const PackageOrder = () => {
//     const key =process.env.EXPO_PUBLIC_GOOGLE_API_KEY
//     console.log(key);

//   return (
//     <View style={styles.container}>

//       <GooglePlacesAutocomplete
//         placeholder="Search for places"
//         onPress={(data, details = null) => {
//           console.log("OUTPUT :"+data+"DETAILS"+ details);
//         }}
//         query={{
//           key: key,
//           language: 'en',
//         }}
//         styles={{
//           textInput: styles.textInput,
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   textInput: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });

// export default PackageOrder;



// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
// } from "react-native";
// import MapView, { Marker } from "react-native-maps";

// const ModalContent = () => {
//   const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
//   console.log(key);
//   const [search, setSearch] = useState("");
//   const [predictions, setPredictions] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState(null);

//   useEffect(() => {
//     if (search.length > 1) {
//       fetchPredictions();
//     } else {
//       setPredictions([]);
//     }
//   }, [search]);

//   const fetchPredictions = async () => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${key}`
//       );
//       const data = await response.json();
//       console.log(data);
//       setPredictions(data.predictions);
//     } catch (error) {
//       console.error("Error fetching predictions:", error);
//     }
//   };

//   const handleSelectPlace = async (placeId) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}`
//       );
//       const data = await response.json();
//       console.log(data);
//       setSelectedPlace(data.result);
//       setSearch(data.result.formatted_address);
//       setPredictions([]);
//     } catch (error) {
//       console.error("Error fetching place details:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Search for a place"
//         value={search}
//         onChangeText={(e) => setSearch(e)}
//       />
//       <FlatList
//         data={predictions}
//         renderItem={({ item }) => (
//           console.log(item.place_id),
//           (
//             <Text
//               style={styles.prediction}
//               onPress={() => handleSelectPlace(item.place_id)}
//             >
//               {item.place_id} {item.description}
//             </Text>
//           )
//         )}
//         keyExtractor={(item) => item.place_id}
//       />

//       {selectedPlace && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: selectedPlace.geometry.location.lat,
//             longitude: selectedPlace.geometry.location.lng,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker
//             coordinate={{
//               latitude: selectedPlace.geometry.location.lat,
//               longitude: selectedPlace.geometry.location.lng,
//             }}
//             title={selectedPlace.name}
//           />
//         </MapView>
//       )}
//     </View>
//   );
// };

import { router, useLocalSearchParams } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView ,Modal,TouchableOpacity,TextInput,FlatList} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, Title } from 'react-native-paper';
import DB from '../../database/firebaseConfig';
import { useUser } from '@clerk/clerk-expo';

const PackageOrder = () => {
  const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  console.log(key);
 
  
// FORMDATA
const {user}=useUser();
const params = useLocalSearchParams();
  
  const initialFormData = {
    userId: params.userId || "",
    image:params.image||"",
    fullName: params.fullName || "",
    phoneNumber: params.phoneNumber || "",
    email: params.email || "",
    pickupLocation: {
      placeId: params.pickupLocation?.placeId || "",
      latitude: params.pickupLocation?.latitude || "",
      longitude: params.pickupLocation?.longitude || "",
      name: params.pickupLocation?.name || "",
      address: params.pickupLocation?.address || "",
    },
    dropffLocation: {
      placeId: params.dropffLocation?.placeId || "",
      latitude: params.dropffLocation?.latitude || "",
      longitude: params.dropffLocation?.longitude || "",
      name: params.dropffLocation?.name || "",
      address: params.dropffLocation?.address || "",
    },
    moverId: params.moverId || "",
    moveDate: params.moveDate || "",
    moveTime: params.moveTime || "",
    itemsDescription: params.itemsDescription || "",
    moversRequired: params.moversRequired || "",
    specialRequests: params.specialRequests || "",
    accessRestrictions: params.accessRestrictions || "",
    additionalNotes: params.additionalNotes || "",
  };

  const [formData, setFormData] = useState(initialFormData)
  const [selectedLocation, setSelectedLocation] = useState({
    latitude:37.78825,
    longitude:-122.4324
  });

  const [placeDetails, setPlaceDetails] = useState(null);
  const [search, setSearch] = useState("");
  const [predictions, setPredictions] = useState([]);

const [IspickupLocationSet, setIspickupLocationSet] = useState(false)

  const handleMapPress = async (event) => {
    console.log(event.data);

    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({
      latitude,
      longitude,
    });

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const place = data.results[0];
        console.log(place);
        console.log(place.formatted_address);
        setPlaceDetails({
          placeId: place.place_id,
          name: place.address_components[0].long_name,
          address: place.formatted_address,
          latitude:latitude,
          longitude:longitude
        });
        setSearch( place.formatted_address)
      }
  
      
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

console.log(encodeURI(params.image));


  useEffect(() => {
   
    if (search.length > 1) {
      fetchPredictions();
    } else {
      setPredictions([]);
    }
  }, [search]);

  const fetchPredictions = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${key}`
      );
      const data = await response.json();
      
      console.log(data);
      setPredictions(data.predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };
  
  const handleSelectLocation = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}`
      );
      const data = await response.json();
      console.log(data);
        const place = data.result
        console.log(place);
        console.log(place.formatted_address);
        // setSelectedLocation(place);
          setPlaceDetails({
          placeId: place.place_id,
          name: place.address_components[0].long_name,
          address: place.formatted_address,
        });
        const latitude=place.geometry.location.lat
        const longitude=place.geometry.location.lng
        console.log("blah blah",latitude,"blaah",longitude);
        
      setSelectedLocation({
        latitude,
        longitude
      });
      setSearch(data.result.formatted_address);
      setPredictions([]);
     
      
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };
  console.log(selectedLocation);


const OnClickNext=() => {
  
  setFormData((prevData) => ({
    ...prevData,
    pickupLocation:{
      placeId:placeDetails.placeId,
      name:placeDetails.name,
      address:placeDetails.address,
      latitude:placeDetails.latitude,
      longitude:placeDetails.longitude
    }

  }));

  setIspickupLocationSet(true)
  console.log(formData);
  setPlaceDetails([])
  setSearch([])
  setPredictions([])

}


const AddDropOff=async() => {
  console.log(placeDetails);
  
  setFormData((prevData) => ({
    ...prevData,
    dropffLocation:{
      placeId:placeDetails.placeId,
      name:placeDetails.name,
      address:placeDetails.address,
      latitude:placeDetails.latitude,
      longitude:placeDetails.longitude
    }

  }));
  setPlaceDetails([]) 
  setSearch([])
  setPredictions([])
  setIspickupLocationSet(false)
  console.log("dropoff location",formData.dropffLocation);
  AddJobListing()
  router.push('/MyOrders?clearData=true');
  // router.push({pathname:'/MyOrders',params:true})
}




const AddJobListing=async() => {

    try {

      console.log(formData.image);
      
      
      await addDoc(collection(DB,"JobListing"),{
        userId:user?.id||"",
        image:formData.image,
        fullName: formData.fullName,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    pickupLocation: {
      placeId: formData.pickupLocation.placeId,
      latitude: formData.pickupLocation.latitude,
      longitude: formData.pickupLocation.longitude,
      name: formData.pickupLocation.name,
      address: formData.pickupLocation.address,
    },
    dropffLocation: {
      placeId: formData.dropffLocation.placeId,
      latitude: formData.dropffLocation.latitude,
      longitude: formData.dropffLocation.longitude,
      name: formData.dropffLocation.name,
      address: formData.dropffLocation.address,
    },

    moverId: formData.moverId|| "",
    moveDate: formData.moveDate,
    moveTime: formData.moveTime,
    itemsDescription: formData.itemsDescription,
    moversRequired: formData.moversRequired,
    specialRequests: formData.specialRequests,
    accessRestrictions: formData.accessRestrictions,
    additionalNotes: formData.additionalNotes,
    status: "pending",
      })
      console.log("Added JobListing");
      
    } catch (error) {
      console.log(error); 
      
    }

}

  return (
    <>

    {IspickupLocationSet?
      <View style={styles.container}>
    <Title>dropff Location</Title>
    <TextInput
      style={styles.input}
      placeholder="Search for a place"
      value={search}
      onChangeText={(e) => setSearch(e)}
    />
    <FlatList
      data={predictions}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelectLocation(item.place_id)}>
          <Text style={styles.prediction}>{item.description}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.place_id}
      style={styles.prediction}
    />

    <MapView
    
      style={styles.map}
      initialRegion={{
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={handleMapPress}
    >
      {selectedLocation && (
        <Marker
        // style={{color:'primary'}}
        
          draggable
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude
          }}       
          onDragEnd={handleMapPress}
        />
      )}
    </MapView>
    
<ScrollView>

    {selectedLocation && placeDetails && (
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Selected Location:</Text>
        <Text style={styles.infoText}>PlaceId: {placeDetails.placeId}</Text>
        <Text style={styles.infoText}>Name: {placeDetails.name}</Text>
        <Text style={styles.infoText}>Address: {placeDetails.address}</Text>
        <Text style={styles.infoText}>Latitude: {selectedLocation.latitude}</Text>
        <Text style={styles.infoText}>Longitude: {selectedLocation.longitude}</Text>
        
      </View>
    )}
</ScrollView>
<Button textColor='white' buttonColor='lightgreen' focusable={true} onPress={AddDropOff} >Submit</Button>
  </View>
    :
    <View style={styles.container}>
    <Title>PickupLocation</Title>
    <TextInput
      style={styles.input}
      placeholder="Search for a place"
      value={search}
      onChangeText={(e) => setSearch(e)}
    />
    <FlatList
      data={predictions}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelectLocation(item.place_id)}>
          <Text style={styles.prediction}>{item.description}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.place_id}
      style={styles.prediction}
    />

    <MapView
    
      style={styles.map}
      initialRegion={{
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={handleMapPress}
    >
      {selectedLocation && (
        <Marker
        // style={{color:'primary'}}
        
          draggable
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude
          }}       
          onDragEnd={handleMapPress}
        />
      )}
    </MapView>
    
<ScrollView>

    {selectedLocation && placeDetails && (
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Selected Location:</Text>
        <Text style={styles.infoText}>PlaceId: {placeDetails.placeId}</Text>
        <Text style={styles.infoText}>Name: {placeDetails.name}</Text>
        <Text style={styles.infoText}>Address: {placeDetails.address}</Text>
        <Text style={styles.infoText}>Latitude: {selectedLocation.latitude}</Text>
        <Text style={styles.infoText}>Longitude: {selectedLocation.longitude}</Text>
        
      </View>
    )}
</ScrollView>
<Button textColor='white' buttonColor='lightgreen'  focusable={true} onPress={OnClickNext} >Next</Button>
  </View>
    }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    // position:'absolute',
  },
  prediction: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  map: {
    // flex: 1,
    marginTop: 0,
    height: '50%'
  },

  infoContainer: {
    padding: 16,
    backgroundColor: "white",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  overlay: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "90%",
    height: "90%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    opacity: 0.8,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PackageOrder;
