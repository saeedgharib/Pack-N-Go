import React,{useEffect,useState} from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import DB from '../../../database/firebaseConfig'
import {Image, StyleSheet,Text,View} from 'react-native'
import {doc,getDocs,collection, where, updateDoc } from 'firebase/firestore';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const ShowCars=()=>{
    const {companyId,jobId}=useLocalSearchParams()
    const carsData = [
        { id: '1', name: 'ford Cargo', type: 'Cargo Van', fare: 200, imageUrl: require("../../../assets/cars/cargovans/fordcargo.png") },
        { id: '2', name: 'MercedesSprinwter', type: 'Cargo Van', fare: 150, imageUrl:require("../../../assets/cars/cargovans/Mercedes-Benz Sprinter.png") },
        { id: '3', name: 'U-Haul CargoVan', type: 'Cargo Van', fare: 100, imageUrl: require("../../../assets/cars/cargovans/U-Haul Cargo Van.png") },

        { id: '4', name: 'Ford F-650 Flabbed', type: 'flabbed', fare: 700, imageUrl: require("../../../assets/cars/flabbed/Ford F-650 Flatbed.png") },
        { id: '5', name: 'Freightliner Flabbed', type: 'flabbed', fare:900, imageUrl: require("../../../assets/cars/flabbed/Freightliner Flatbed.png") },

        { id: '6', name: 'Budget 26ft', type: 'largebox', fare: 500, imageUrl:require("../../../assets/cars/largebox/budget-26ft.png") },
        { id: '7', name: 'Penseke 26ft', type: 'largebox', fare: 600, imageUrl: require("../../../assets/cars/largebox/penseke-26ft.jpeg") },
        { id: '8', name: 'U-Haul 26ft', type: 'largebox', fare: 700, imageUrl: require("../../../assets/cars/largebox/uhaul-26ft.png") },

        { id: '9', name: 'Budget 20ft', type: 'mediumbox', fare: 350, imageUrl: require("../../../assets/cars/mediumbox/budget-20ft.png") },
        { id: '10', name: 'Penseke 20ft', type: 'mediumbox', fare: 400, imageUrl: require("../../../assets/cars/mediumbox/penseke20ft.jpeg") },
        { id: '11', name: 'U-Haul 20ft', type: 'mediumbox', fare: 400, imageUrl:require("../../../assets/cars/mediumbox/U-Haul 20ft.png") },

        { id: '12', name: 'Budget 12ft', type: 'smallbox', fare: 200, imageUrl: require("../../../assets/cars/smallbox/Budget 12ft Truck,.png") },
        { id: '13', name: 'Penseke 26ft', type: 'smallbox', fare: 350, imageUrl: require("../../../assets/cars/smallbox/penseke-16ft.png") },
        { id: '14', name: 'U-Haul 10ft', type: 'smallbox', fare: 200, imageUrl: require("../../../assets/cars/smallbox/U-Haul 10ft Truck.png")},

        { id: '15', name: 'Ford truck', type: 'small trucks', fare: 250, imageUrl: require("../../../assets/cars/smalltrucks/ford.png") },
        { id: '16', name: 'Toyota Tacoma', type: 'small trucks', fare: 100, imageUrl: require("../../../assets/cars/smalltrucks/tyota-tacoma.png") },
        { id: '17', name: 'U-Haul mini', type: 'small trucks', fare: 100, imageUrl:require("../../../assets/cars/smalltrucks/u-haul-mini.png") },
        

        { id: '18', name: 'Isuzu Truck', type: 'refrigirated', fare: 900, imageUrl: require("../../../assets/cars/refrigirated/Isuzu Truck.jpg") },
        { id: '19', name: 'Thermoking Truck', type: 'refrigirated', fare: 900, imageUrl: require("../../../assets/cars/refrigirated/thermoking.jpg")},
        // Add more cars as needed
      ];
    const [cars, setCars] = useState([])
    const [selectedType, setSelectedType] = useState('All');

    const carTypes = ['All', 'Cargo Van', 'smallbox','small trucks','refrigirated','flabbed','largebox','mediumbox'];
    const filteredCars = selectedType === 'All' ? carsData : carsData.filter(car => car.type === selectedType);
    const fetchCars = async() =>{
        try {
            const query = await getDocs(collection(DB, "cars"),);
      
            const driverssData = query.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Company Data: ", driverssData);
            setCars(driverssData);
          } catch (error) {
            console.error("Error fetching Drivers: ", error);
          }
}
useEffect(() => {
    // fetchCars();
   
},[])

const AddandProceed=async(item)=>{
  try {
  
    await updateDoc(doc(DB,"JobListing", jobId), {
    carId:item.id,
    })
    
    router.push({pathname:'FareCalculation', params: { companyId: companyId, jobId: jobId,carId:item.id ,carFare:item.fare}})

  } catch (error) {
    
  }
}
const CarCard = ({item}) => (



    <TouchableOpacity onPress={()=>AddandProceed(item)}>
    
    
  <View
  style={styles.card}> 
{/* <Image source={{uri:item.carImageUrl}} width={100} height={100} style={{objectFit:'contain',margin:10,borderRadius:10}}></Image> */}
<Image source={item.imageUrl} height={100} width={100}  style={{objectFit:'contain',margin:10,borderRadius:10, width:120,height:90}}></Image>
<View style={{flexDirection:'column'}}>

<Text style={{marginTop:20,fontWeight:'bold'}}>Name:<Text style={styles.cardata}>{item.name}</Text></Text>
<Text style={{marginTop:20,fontWeight:'bold'}}>Description:<Text style={styles.cardata}>{item.Description}</Text></Text>
</View>
<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

    <Text style={{fontSize:16,fontWeight:'bold',position:'static'}}>RS{item.fare}</Text>
</View>

  </View>
    </TouchableOpacity>


);



return(
    <GestureHandlerRootView>
    <View style={styles.container}>

<FlatList
// style={styles.container}
        data={carTypes}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.tabItem, selectedType === item && styles.activeTab]}
            onPress={() => setSelectedType(item)}
          >
            <Text style={[styles.tabText, selectedType === item && styles.activeTabText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      /> 
    
    </View>
    
    <FlatList
    data={filteredCars}
    renderItem={CarCard}
    keyExtractor={(item) => item.id}
  />
    </GestureHandlerRootView>
)








}
const styles = StyleSheet.create({
  card:{
    flex: 1,
    flexDirection:'row',
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
  },
  container: {
    
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardata:{
    color:'green',
    fontWeight:'900'
  }
});
export default ShowCars;