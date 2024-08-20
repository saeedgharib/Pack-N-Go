import React, { useEffect,useState } from 'react'
import { View,ScrollView,FlatList,Image ,StyleSheet, Pressable} from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { getDocs,collection } from 'firebase/firestore';
import DB from '../../database/firebaseConfig';
import { Card, Text, Title, DataTable, Button, Divider } from 'react-native-paper';
import { router } from 'expo-router';


const User = () => {

const {user}=useUser()

const [companies, setCompanies] = useState([]);
const [orderHistory, setOrderHistory] = useState([]);

const fetchCompanies = async () => {
    try {
    //   const companySnapshot = await firestore.collection('companies').get();
    //   const companyData = companySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   console.log("Company Data: ", companyData); // Debugging
    //   setCompanies(companyData);

      const querySnapshot = await getDocs(collection(DB,"companies")); 
//       const companyData =  querySnapshot.forEach((doc) => {
//   doc.id, " => ", doc.data()
// })
const companyData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
console.log("Company Data: ", companyData);
setCompanies(companyData);
    } catch (error) {
      console.error("Error fetching companies: ", error);
    }
  };
useEffect(() => {
  // Dummy data for companies
 
  fetchCompanies();

  // Dummy data for order history
  const dummyOrders = [
    { id: '1001', date: '2023-01-01', status: 'Delivered'},
    { id: '1002', date: '2023-01-05', status: 'Shipped' },
    { id: '1003', date: '2023-01-10', status: 'Pending'},
  ];
  setOrderHistory(dummyOrders);
}, []);

const renderCompanyCard = ({ item }) => (
    <Pressable >
    

  <Card style={styles.card} onPress={()=>router.push({pathname:'CompanyDetails',params:{id:item.id}})}>
    <Card.Content >
    <Image  source={{uri:item.logo}} style={styles.logo} />
      <Title>{item.name}</Title>
      <Text>{item.summary}</Text>
    </Card.Content>
  </Card>
    
    </Pressable>
);

  return (
//     <View>
//         <Text>Users Home {user.emailAddresses[0].emailAddress}</Text>
//         <Link href={{
//           pathname: '../Profile/[id]',
//           params: { id: user.id },
//         }}>
//               <Text>Go to profile dash</Text>
//         </Link>
//         <IconButton
//    icon="">
  
// <Text>press me</Text>
//         </IconButton>
//          </View>
<ScrollView>

<View style={{ padding: 20 }}>
  <Title>Hello, <Title style={{fontWeight:'bold',color:'green'}}>{user?.fullName}</Title></Title>
  <Divider />
  <FlatList
    data={companies}
    renderItem={renderCompanyCard}
    keyExtractor={item => item.id}
    horizontal
    showsHorizontalScrollIndicator={false}
    style={{ marginVertical: 20 }}
  />


  <Title>Previous Order History</Title>
  <DataTable>
    <DataTable.Header>
      <DataTable.Title >Order ID</DataTable.Title>
      <DataTable.Title>Date</DataTable.Title>
      <DataTable.Title>Status</DataTable.Title>
    </DataTable.Header>
    {orderHistory.map(order => (
      <DataTable.Row key={order.id}>
        <DataTable.Cell>{order.id}</DataTable.Cell>
        <DataTable.Cell>{order.date}</DataTable.Cell>
        <DataTable.Cell>{order.status}</DataTable.Cell>
      </DataTable.Row>
    ))}
  </DataTable>
</View>
</ScrollView>
  )
}

export default User

const styles = StyleSheet.create({
    card: {
      margin: 10,
      height: 210,
      width: 170,
      // overflow: 'hidden',
    },
    logo: {
      width: 120,
      height: 100,
      alignSelf: 'center',
      marginBottom: 10,
    },
    title: {
      textAlign: 'center',
      marginBottom: 10,
    },
  });