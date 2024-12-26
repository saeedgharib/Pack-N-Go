import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
  Linking
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { getDocs, collection, updateDoc,doc } from "firebase/firestore";
import DB from "../../../database/firebaseConfig";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  Card,
  Text,
  Title,
  DataTable,
  Button,
  Divider,
  Paragraph,
  Avatar,
} from "react-native-paper";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";


const StarRating = ({ maxStars = 5, moverRating }) => {
    
    return (
        <View style={{
    flexDirection: 'row',
    justifyContent: 'center',
  }}>
        {Array.from({ length: maxStars }, (_, index) => (
          <TouchableOpacity key={index}>
            <Icon
              name={index < moverRating ? 'star' : 'star-o'}
              size={30}
              // color="#FFD700"
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  


  
  
  
  
  
//   const MoverCard = ({ mover ,JobId}) => {
//       // const LeftContent = props => <Avatar.Icon {...props} icon={mover?.logo} />
     
// const handlePressMover=(companyId) => {
//     // Replace with actual job ID
//     updateDoc(doc(DB, "JobListing", JobId), {
//         moverId: companyId,
//     });
//     // Navigate to the next step (fare calculation or confirmation)
//     router.push({
//       pathname:'FareCalculation',
//       params:{companyId: companyId,jobId:JobId}
//     });
// }
//   return (
   
    
//           <Pressable
//           onPress={()=>handlePressMover(mover.id)}
//           >
//             <View style={styles.container}>
//             <Card key={mover?.id} style={{ margin: 10 }}>
//           <Card.Content>
//             <View style={{flex:1,justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
//             <Title style={{fontWeight:'bold'}}>{mover.companyName}</Title>
//       <StarRating moverRating={mover.rating} />
      
//     </View>
//             <Paragraph style={{fontWeight:'bold'}} >Contact: <Text>{mover.phoneNumber}</Text></Paragraph>
//             <Paragraph style={{fontWeight:'bold'}}>Email: <Text style={{color:'blue'}}>{mover.email}</Text></Paragraph>
//             <Paragraph style={{fontWeight:'bold'}}>Business License: <Text>{mover.businessLicense}</Text></Paragraph>
//             {/* <Paragraph>Insurance: {mover.insuranceDetails}</Paragraph> */}
//           </Card.Content>
          
//         </Card>
//             </View>
//           </Pressable>

//   );
// };

// const ListMovers = () => {
//   const [movers, setMovers] = useState([]);
   

//   // const fetchMoversfromClerk = async () => {

//   //   try {
//   //     const response = await fetch('https://api.clerk.dev/v1/users', {
//   //       method: 'GET',
//   //       headers: {
//   //         'Authorization':`Bearer ${key}` , // Replace with your actual API key or JWT
//   //         'Content-Type': 'application/json',
//   //       },
//   //     });
//   //     const MoversData = await response.json();
    
//   //     console.log(MoversData);
//   //     setMovers(MoversData);
//   //   } catch (error) {
//   //     console.error('Error fetching users:', error);
//   //   }
//   // };
//   const params = useLocalSearchParams()
//     const ID=params.id


//   const fetchMoversfromDB = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(DB, "companies"));

//       const moversData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
//       console.log("Company Data: ", moversData);
//       setMovers(moversData);
//     } catch (error) {
//       console.error("Error fetching Movers: ", error);
//     }
//   };

//   useEffect(() => {
    
//     fetchMoversfromDB();
//   }, []);

//   const renderItem = ({ item }) => (
//     <MoverCard mover={item} JobId={ID}/>
//   );


//   return (
// <GestureHandlerRootView>

//       <View style={{ padding: 20 }}>
      

//       <Title style={{fontWeight:'bold',color:'#000'}}>Select a Mover</Title>
//       <Title style={{ fontWeight: "bold", color: "#000" ,position:'absolute',marginTop:10,marginLeft:'75%'}}>
          
//           </Title>
 
      
//         <Divider />

//         <FlatList
//           data={movers}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//         />
//       </View>
// </GestureHandlerRootView>
 
//   );
// };

// export default ListMovers;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "transparent",
//   },
  
//   card1: {
//     margin: 10,
//     height: 210,
//     width: 170,
//     // overflow: 'hidden',
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     alignSelf: "center",
//     marginBottom: 10,
//     borderRadius:50,
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   card: {
//     flex: 1,
    
//     backgroundColor: "#fff",
//     // backgroundColor: '#030d1c',
//     padding: 20,
//     marginVertical: 10,
//     marginHorizontal: 5,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 10,
//     elevation: 5,

//     // alignItems: "center",
//     // height: '100%',
//   },
//   cardText: {
//     fontSize: 18,
//     color: "#000",
//   },
//   deleteButton: {
//     backgroundColor: "red",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 75,
//     // height: '100%',
//     marginVertical: 10,
//   },
//   banButton: {
//     backgroundColor: "green",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 75,
//     // height: '100%',
//     marginVertical: 10,
//   },
//   // buttonText: {
//   //   color: "#fff",
//   //   fontWeight: "bold",
//   // },

// button: {
//     backgroundColor: '#000', // Match button color to your theme
//     padding: 5,
//     flex:1,
//     borderRadius: 5,
//     marginBottom: 10, // Add space between buttons
//     width: '40%', // Make the button full-width to ensure text wraps
//     alignItems: 'center', // Center the text inside the button
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center', // Center-align the text within the button
//     flexWrap: 'wrap',
//     fontWeight:'bold' // Allow text to wrap inside the button
//   },

 
// });









const MoverCard = ({ mover, JobId }) => {
  const handlePressMover = (companyId) => {
    updateDoc(doc(DB, "JobListing", JobId), {
      moverId: companyId,
    });
    router.push({
      pathname: "ShowCars",
      params: { companyId: companyId, jobId: JobId },
    });
  };

  return (
    <Pressable onPress={() => handlePressMover(mover.id)}>
      <View style={styles.container}>
        <Card key={mover?.id} style={{ margin: 10 }}>
          <Card.Content>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Title style={{ fontWeight: "bold" }}>{mover.companyName}</Title>
              <StarRating moverRating={mover.rating} />
            </View>
            <Paragraph style={{ fontWeight: "bold" }}>
              Contact: <Text>{mover.phoneNumber}</Text>
            </Paragraph>
            <Paragraph style={{ fontWeight: "bold" }}>
              Email: <Text style={{ color: "blue" }}>{mover.email}</Text>
            </Paragraph>
            <Paragraph style={{ fontWeight: "bold" }}>
              Business License: <Text>{mover.businessLicense}</Text>
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </Pressable>
  );
};

const ListMovers = () => {
  const [movers, setMovers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredMovers, setFilteredMovers] = useState([]);
  const [sortOption, setSortOption] = useState("none"); // State for sorting

  const params = useLocalSearchParams();
  const ID = params.id;

  // Fetch movers from DB
  const fetchMoversfromDB = async () => {
    try {
      const querySnapshot = await getDocs(collection(DB, "companies"));
      const moversData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovers(moversData);
      setFilteredMovers(moversData);
    } catch (error) {
      console.error("Error fetching Movers: ", error);
    }
  };

  useEffect(() => {
    fetchMoversfromDB();
  }, []);
  
  useEffect(() => {
    // When movers are fetched, show them all initially
    setFilteredMovers(movers);
  }, [movers]);
  

  // Handle search input
  const handleSearch = (text) => {
    setSearchText(text);
    const lowercasedText = text.toLowerCase(); // Convert search text to lowercase
  
    if (lowercasedText === '') {
      // If the search input is empty, reset to show all movers
      setFilteredMovers(movers);
    } else {
      // Otherwise, filter the movers list based on the search input
      const filtered = movers.filter(
        (mover) =>
          mover.companyName &&
          mover.companyName.toLowerCase().includes(lowercasedText) // Check if companyName exists before calling toLowerCase
      );
      setFilteredMovers(filtered);
    }
  };
  
  // Handle sorting by fare
  const handleSortByFare = () => {
    const sorted = [...filteredMovers].sort((a, b) => a.fare - b.fare);
    setFilteredMovers(sorted);
    setSortOption("lowToHigh");
  };

  const renderItem = ({ item }) => <MoverCard mover={item} JobId={ID} />;

  return (
    <GestureHandlerRootView>
      <View style={{ padding: 20 }}>
        <Title style={{ fontWeight: "bold", color: "#000" }}>
          Select a Mover
        </Title>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Movers"
          value={searchText}
          onChangeText={handleSearch}
        />
        {/* <View style={styles.sortButtonContainer}>
          <Pressable style={styles.button} onPress={handleSortByFare}>
            <Text style={styles.buttonText}>Sort by Fare: Low to High</Text>
          </Pressable>
        </View> */}
        <Divider />
        <FlatList
          data={filteredMovers}
        
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default ListMovers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
  },
  sortButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
