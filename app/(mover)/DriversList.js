import React,{useEffect,useState} from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import DB from '../../database/firebaseConfig';
import {Image, StyleSheet} from 'react-native'
import {doc,getDocs,collection, where } from 'firebase/firestore';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const DriversList=()=>{

    const [drivers, setDrivers] = useState([])


    const fetchDrivers = async() =>{
        try {
            const query = await getDocs(collection(DB, "drivers"));
      
            const driverssData = query.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Company Data: ", driverssData);
            setDrivers(driverssData);
          } catch (error) {
            console.error("Error fetching Drivers: ", error);
          }
}
useEffect(() => {
    fetchDrivers();
   
},[])
const DriverCard = ({item}) => (

    
  <Card.Title
  style={styles.card}
    title={item.name}
    titleStyle={styles.title}
    subtitle={"Contact No:"+item.phone}
    
    left={(props) => <FontAwesome name="user" size={48} color="lightgreen" />}
    // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
    // right={()=> <Card.Cover source={{ uri: item.licenseUrl }} />}
  />

);



return(
    <GestureHandlerRootView>

    <FlatList
    data={drivers}
    renderItem={DriverCard}
    keyExtractor={(item) => item.id}
  />
    </GestureHandlerRootView>
)








}
const styles = StyleSheet.create({
  card:{
    backgroundColor:"white",
    margin: 10,
    borderRadius:12,
    borderWidth:1,
    borderColor: "grey",
    elevation:"secondary",
    fontWeight:'bold',
  },
  title:{
fontWeight:'bold',
  }
});
export default DriversList;