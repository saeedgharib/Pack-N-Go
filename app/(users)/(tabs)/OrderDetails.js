import { useLocalSearchParams } from 'expo-router'
import React ,{useEffect,useState}from 'react'
import { View,Text } from 'react-native'

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
        <Text>Order Details</Text>
    </View>
  )
}

export default OrderDetails
