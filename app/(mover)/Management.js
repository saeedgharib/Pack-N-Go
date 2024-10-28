// screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
const Management = () => {

const GotoAddDrivers = () => { 
    console.log("GotoAddDrivers");
    
    router.push({pathname:'AddDrivers',params:""})
}
const GotoAddCars = () => { 
    router.push('AddCars')
}
  return (
    <View style={styles.container}>
      
      <Button 
        mode="contained" 
        onPress={GotoAddDrivers} 
        style={styles.button}
      >
        Add Driver
      </Button>
      <Button 
        mode="contained" 
        onPress={GotoAddCars} 
        style={styles.button}
      >
        Add Car
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    marginVertical: 10,
    backgroundColor: '#6200ee',
  },
});

export default Management;
