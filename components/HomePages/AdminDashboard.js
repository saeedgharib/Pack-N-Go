import React from 'react'
import { StyleSheet,  View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Card, Text, Title, DataTable, Button, Divider } from 'react-native-paper';
import { useUser } from '@clerk/clerk-expo'
import { router } from 'expo-router';


export default AdminDashboard = () => {
    const {user}=useUser();
        
      return (
    <ScrollView>
<View style={{ padding: 20 }}>
  <Title>Hello Admin,<Title style={{fontWeight:'bold',color:'#000'}}>{user?.fullName.toLocaleUpperCase()}</Title></Title>
  <Divider bold={true}  />
  {/* <Title style={{fontWeight:'bold',color:'green'}}>Registered Companies</Title> */}
  <Divider />
  </View>
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuBox} onPress={()=>router.push('/Users' )}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/?size=100&id=psevkzUhHRTs&format=png&color=000000' }}
        />
        <Text style={styles.info}>Manage Users</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/administrator-male.png' }}
        />
        <Text style={styles.info}>Manage Movers</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/pie-chart.png' }}
        />
        <Text style={styles.info}>Stats</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/shop.png' }}
        />
        <Text style={styles.info}>Shop</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/product.png' }}
        />
        <Text style={styles.info}>Product</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/traffic-jam.png' }}
        />
        <Text style={styles.info}>Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/dusk/70/000000/visual-game-boy.png' }}
        />
        <Text style={styles.info}>Info</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/70/000000/user.png' }}
        />
        <Text style={styles.info}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBox}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/?size=100&id=XFOumBmRR5zT&format=png&color=000000' }}
        />
        <Text style={styles.info}>Review</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuBox: {
    // backgroundColor: '#DCDCDC',
    backgroundColor: '#030d1c',
    borderRadius:20,
    width: 180,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowOffset: { width: 1, height: 2 },
  },
  icon: {
    width: 60,
    height: 60,
  },
  info: {

    fontSize: 22,
    fontWeight:'bold',
    // color: '#696969',
    color:"#fff",
  },
})

        