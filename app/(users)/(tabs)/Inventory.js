import React,{useEffect, useState} from 'react'
import { Card, Text,Avatar,Button } from 'react-native-paper'
import { StyleSheet,FlatList, View,ScrollView, Pressable,Image,  } from 'react-native';
import DB from '../../../database/firebaseConfig';
import { getDocs,collection,doc, deleteDoc } from 'firebase/firestore';
import { EmailAuthCredential } from 'firebase/auth/web-extension';
import EditInventory from './EditInventory';
import { router } from 'expo-router';
const Inventory = () => {
  const logo =null
  const [inventory,setInventory]=useState([])
    const DeleteOrder=async(id) => {
      try {
        await deleteDoc(doc(DB,"inventory",id))
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
    const renderInventoryCard = ({ item }) => (
      //   <Pressable>
      
      // <Card style={styles.card} >
      // <Image  source={{uri:item.image}} style={{width:100,height:100}} resizeMode='contain' alt='image'/>
      //      <Card.Title
      //   title="Card Title"
      //   subtitle="Card Subtitle"
      //   left={() => <Avatar.Image Image size={24} source={{uri:item.image}}  />}
      
      // />
      <Card >
      
  {/* <Card.Title title="Card Title" subtitle="Card Subtitle"  /> */}
  <Card.Content>
    <Text variant="titleLarge">{item.name}</Text>
    <Text variant="bodyMedium">Card content</Text>
  </Card.Content>
  <Card.Cover source={{ uri: item.image }}  />
  <Card.Actions>
    <Button  onPress={()=>EditOrder(item.id)} buttonColor='black' textColor='white'>edit</Button>
    <Button onPress={()=>DeleteOrder(item.id)} buttonColor='lightgreen' textColor='white'>proceed</Button>
    <Button  onPress={()=>DeleteOrder(item.id)} buttonColor='red' textColor='white'>Delete</Button>
  </Card.Actions>
</Card>
    );


    const fetchInventory=async()=>{
    
            try {
              const querySnapshot = await getDocs(collection(DB,"inventory"));
        const inventoryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Inventory Data: ", inventoryData);
        setInventory(inventoryData)
            } catch (error) {
              console.error("Error fetching Furnitures: ", error);
            }
            console.log(inventory[6].image)
    }



    useEffect(() => {

        fetchInventory()
        fetchInventory()
    },[])

  return (


    <View>
        <FlatList
    data={inventory}
    renderItem={renderInventoryCard}
    keyExtractor={item => item.id}
    horizontal={false}
    showsHorizontalScrollIndicator={false}
    style={{ marginVertical: 20 }}
  />
    </View>
   
  )
}

export default Inventory

const styles = StyleSheet.create({
    card: {
      margin: 10,
      // height: 120,
      width: '90vw',
    flexDirection: 'row',
    // alignItems:'center',
    // justifyContent: 'space-evenly',
   
      // overflow: 'hidden',
    },
})