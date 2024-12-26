import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import DB from "../../../database/firebaseConfig";
import { TouchableOpacity } from "react-native";
const logo = require("../../../assets/company3.png");
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";


const CompanyFare = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [distance, setDistance] = useState(null); 
  const [duration, setDuration] = useState(null);
  const [moverDetail, setMoverDetail] = useState();
  const [fare, setFare] = useState(null);
  const key = "AIzaSyC6kkz9yNjthTzu8vGULBRafD-4B1Hnc_o";
  console.log(key);

  useEffect(() => {
    fetchLocations();
    fetchMover();
    fetchPublishableKey();
  }, []);

  const { companyId, jobId ,carId,carFare} = useLocalSearchParams();
 

  const fetchMover = async () => {
    try {
      const docRef = doc(DB, "companies", companyId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setMoverDetail(docSnap.data());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPlaceDetails = async () => {
    try {
      const docRef = doc(DB, "JobListing", jobId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } 
      console.log(docSnap.data().dropoffLocation.address);
      setPickupLocation(docSnap.data().pickupLocation);
      setDropoffLocation(docSnap.data().dropoffLocation);
    } catch (error) { 
      console.error("Error fetching JobListing: ", error);
    }
  };

  const fetchLocations = async () => {
    getPlaceDetails();

    // Calculate the distance using Google Distance Matrix API
    const distanceResponse = await getDistanceFromGoogleAPI();
    setDistance(distanceResponse);

    // Calculate fare based on distance
    const calculatedFare = calculateFare(distanceResponse);
    setFare(calculatedFare);
  };
  // Fetch pickup and drop-off locations from the database

  // Google Distance Matrix API call (replace with actual API key)
  const getDistanceFromGoogleAPI = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${pickupLocation.placeId}&destinations=place_id:${dropoffLocation.placeId}&key=${key}
`
      );
      const data = await response.json();
      console.log(data);
      
      const distanceInMeters = data.rows[0].elements[0].distance.value;
      const durationMins = data.rows[0].elements[0].duration.value;
      console.log(distanceInMeters);
      setDuration(durationMins / 60); // Convert to hours
      return distanceInMeters / 1000; // Convert to kilometers
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Simple fare calculation
  const calculateFare = (distance) => {
    const farePerKm = 30;
    const averageDriverPay=2;
     // Example fare rate per kilometer
    return distance *( farePerKm+ averageDriverPay+carFare);
  };

  const [publishableKey, setPublishableKey] = useState("");

  const fetchPublishableKey = async () => {
    const response = await fetch("http://192.168.1.26:3000/pubkey", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    console.log(res);

    // fetch key from your server here
    setPublishableKey(res.key);
  };

  const fetchPaymentSheetParams = async () => {
    const total = fare ;
    try {
      const response = await fetch("http://192.168.1.26:3000/payment-sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({ total: total }),
      });
      console.log('====================================');
      console.log({response});
      console.log('====================================');
      const { paymentIntent, ephemeralKey, customer } = await response.json();  
      console.log("paymentIntent"+{paymentIntent});
       
      return {  
        paymentIntent,
        ephemeralKey,
        customer,
      }; 
    } catch (error) {}
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
      if (!paymentIntent || !ephemeralKey || !customer) {
        console.error("Payment sheet initialization failed. Missing params.");
        alert("Error: Could not initialize payment sheet.");
        return;
      }
    
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {  
        name: "Jane Doe",
      }
      // returnURL: "http://localhost:3000",
    });
    if (!error) {
      setLoading(true);
    }
  };
const updateJobListing = async () => {
  try {
   await updateDoc(doc(DB, "JobListing", jobId), {
      status:'processing',  
    });
    
  } catch (error) {
    console.log(error);
    
  }
}
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      alert(`Error code: ${error.code}`, error.message);
    } else {  
      await updateJobListing()
      alert("Success"+"Your order is confirmed!");
    }
  };

  console.log("companyId:" + companyId + "\nJobID:" + jobId + "\ncarID:" + carId+ "\ncarFare:" + carFare);

  const pay = async () => {
    await initializePaymentSheet();
    if (loading) {
      await openPaymentSheet();
    }
  };

  console.log(pickupLocation);
  console.log(dropoffLocation);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      // required for 3D Secure and bank redirects
    >
      <View style={styles.container}>
        <Card style={styles.companyCard}>
          <Card.Title title={moverDetail?.companyName} /> 
          {/* <Card.Cover source={{ uri: logo ||"../../"}} style={styles.companyLogo} /> */}
          <Card.Content>
            <Text>{moverDetail?.email}</Text>
          </Card.Content>
        </Card>

        <View style={styles.locationContainer}>
          <Text>Pickup Location</Text>
          <TextInput
            style={styles.locationInput}
            value={pickupLocation.address}
            editable={false}
            placeholder="Pickup Location"
          />
          <Text>Dropoff Location Location</Text>
          <TextInput
            style={styles.locationInput}
            value={dropoffLocation.address}
            editable={false}
            placeholder="Dropoff Location"
          />
        </View>
 
        {fare !== null && (
          <Card style={styles.fareCard}>
            {/* <Image
              source={{ uri: require("../../../assets/images/logo.jpg") }}
              style={styles.fareCardBackground}
            /> */}
            <Card.Content>
              <Text style={styles.fareText}>
                Distance: {distance?.toFixed(2)} km
              </Text>
              <Text style={styles.fareText}>Fare: {fare||"45000"}PKR</Text>
              {/* <Text style={styles.fareText}>Duration:{duration?.toFixed(3)}mins</Text> */}
            </Card.Content> 
          </Card>  
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            margin: 10, 
            padding: 10,
            borderRadius: 20,
          }}
          onPress={pay}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "900" }}>Pay </Text>
            <MaterialIcons name="payment" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  companyCard: {
    marginBottom: 20,
  },
  companyLogo: {
    height: 150,
    marginTop: 10,
  },
  locationContainer: {
    marginVertical: 20,
  },
  locationInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  fareCardBackground: {
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 50,
  },
  fareCardImage: {
    opacity: 0.2, 
  },
  fareCard: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 4,
  },
  fareText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CompanyFare;
