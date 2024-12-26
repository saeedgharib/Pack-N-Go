import { useLocalSearchParams } from 'expo-router'
import React ,{useEffect,useState}from 'react'
import { View,Text } from 'react-native'
import MapsUser from './MapsUser'

const OrderDetails = () => {
    const orderId=useLocalSearchParams()
    const [orderDetails, setOrderDetails] = useState(null)
    const fetchOrderDetails = async () => {
        try {
            
        } catch (error) {
            
        }
    }

useEffect(() => {
    fetchOrderDetails()
}, )
console.log(orderId);


  return (
    <View>
        <Text>Order Details\</Text>
        <MapsUser orderId={orderId}/>
    </View>
  )
}

export default OrderDetails
