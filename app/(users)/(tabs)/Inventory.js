import React,{useEffect, useState} from 'react'
import { StyleSheet,FlatList, View,ScrollView, Pressable,Image,TouchableOpacity,RefreshControl } from 'react-native';
import DB from '../../../database/firebaseConfig';
import { getDocs,collection,doc, deleteDoc } from 'firebase/firestore';
import { EmailAuthCredential } from 'firebase/auth/web-extension';
import EditInventory from './EditInventory';
import { router } from 'expo-router';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
Swipeable,
} from "react-native-gesture-handler";
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
import Spinner from 'react-native-loading-spinner-overlay';


const Inventory = () => {


  const [inventory,setInventory]=useState([])
  const [loading,setLoading]=useState(false)
  const [refreshing, setRefreshing] = useState(false);
    const DeleteOrder=async(id) => {
      try {
        await deleteDoc(doc(DB,"JobListing",id))
        console.log("Success")
        fetchInventory()
      } catch (error) {
        console.log(error);
      }

    }

    const EditOrder=(id)=>{
      console.log(id)
      router.push({pathname:'EditInventory',params:{id:id}})  
    }

    const handleProceed=(id)=>{
      router.push({pathname:'ListCompanies',params:{id:id}})
    }


    const renderInventoryCard = ({ item, onDelete, onEdit }) => {
      // const LeftContent = props => <Avatar.Icon {...props} icon={mover?.logo} />
      const LeftContent = props => <Avatar.Image size={50} source={{uri: item?.logo}} />
  
    const renderRightActions = (progress, dragX) => (
      <TouchableOpacity
        onPress={()=>DeleteOrder(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash" size={24} color={"#fff"}></Ionicons>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    );
  
    const renderLeftActions = (progress, dragX) => (
      <TouchableOpacity 
       onPress={()=>EditOrder(item.id)}
           style={styles.banButton}>
        {/* <FontAwesome name="ban" size={24} color="white" /> */}
        <MaterialIcons name="edit" size={24} color="white" />
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    );
  
    
    return (
     
          <Swipeable
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
          >
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "OrderDetails",
                  params: { orderId: item?.id },
                });
              }}
            >
              <View style={styles.container}>
              <Card key={item?.id} style={{ margin: 10 }}>
            <Card.Content>
              <View style={{flex:1,justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
              <Title style={{fontWeight:'bold'}}>{item?.fullName}</Title>
         
      </View>
              <Paragraph style={{fontWeight:'bold'}} >Pickup Address: <Text style={styles.details}>{item.pickupLocation.address}</Text></Paragraph>
              <Paragraph style={{fontWeight:'bold'}}>DropOff Address: <Text  style={styles.details}>{item.dropffLocation.address}</Text></Paragraph>
              <Paragraph style={{fontWeight:'bold'}}>Status: <Text  style={styles.details}>{item.status}</Text></Paragraph>
              {/* <Paragraph>Insurance: {mover.insuranceDetails}</Paragraph> */}
            </Card.Content>
            {/* <Card.Cover source={{uri:item.image}}  /> */}
            <Card.Actions>
            {item.status == 'pending'&&

              <TouchableOpacity
                style={styles.button} 
                onPress={()=>handleProceed(item.id)}
              >
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
            }
            </Card.Actions>
          </Card>
              </View>
            </Pressable>
          </Swipeable>
  
    );
  };






//     const renderInventoryCard = ({ item }) => (
      
//       <Card>
      
//   {/* <Card.Title title="Card Title" subtitle="Card Subtitle"  /> */}
//   <Card.Content>
//     <Text variant="titleLarge">{item?.fullName}</Text>
//     <Text variant="bodyMedium">{item?.itemsDescription}</Text>
//   </Card.Content>
//   <Card.Cover source={{uri:item.image}}  />

//   <Card.Actions>
//     <Button  onPress={()=>EditOrder(item.id)} buttonColor='black' textColor='white'>edit</Button>
//     <Button onPress={()=>handleProceed(item.id)} buttonColor='lightgreen' textColor='white'>proceed</Button>
//     <Button  onPress={()=>DeleteOrder(item.id)} buttonColor='red' textColor='white'>Delete</Button>
//   </Card.Actions>
// </Card>
//     );


    const fetchInventory=async()=>{
      setLoading(true)
            try {
              const querySnapshot = await getDocs(collection(DB,"JobListing"));
        const inventoryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // console.log("Inventory Data: ", inventoryData);
        setInventory(inventoryData)
        console.log("Inventory Data: ", inventory);
       
       setLoading(false)
            } catch (error) {
              console.error("Error fetching Furnitures: ", error);
            }
            
    }
  


    useEffect(() => {

        fetchInventory()
        fetchInventory()
        
    },[])
    const onRefresh = async () => {
      setRefreshing(true);
      await fetchInventory()
      setRefreshing(false);
    };

  return (


    <View>
    <Spinner visible={loading}/>
        <FlatList
    data={inventory}
    renderItem={renderInventoryCard}
    keyExtractor={item => item.id}
    horizontal={false}
    refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} // Call the onRefresh function when user pulls to refresh
          />
        }
    showsHorizontalScrollIndicator={false}
    style={{ marginVertical: 20 }}
  />
    </View>
   
  )
}

export default Inventory

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  card1: {
    margin: 10,
    height: 210,
    width: 170,
    // overflow: 'hidden',
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius:50,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    flex: 1,
    
    backgroundColor: "#fff",
    // backgroundColor: '#030d1c',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,

    // alignItems: "center",
    // height: '100%',
  },
  cardText: {
    fontSize: 18,
    color: "#000",
  },
  details:{
    color:'#00b55e',
    fontWeight:'bold'
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    // height: '100%',
    marginVertical: 10,
  },
  banButton: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    // height: '100%',
    marginVertical: 10,
  },
 
button: {
    backgroundColor: '#608a65', // Match button color to your theme
    padding: 12,
    flex:1,
    borderRadius: 10,
    marginBottom: 10, // Add space between buttons
    width: '40%', // Make the button full-width to ensure text wraps
    alignItems: 'center', // Center the text inside the button
  },
  buttonText: {
    color: 'white',
    textAlign: 'center', // Center-align the text within the button
    flexWrap: 'wrap',
    fontWeight:'bold' // Allow text to wrap inside the button
  },

    
})