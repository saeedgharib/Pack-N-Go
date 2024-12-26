import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import DB from '../../database/firebaseConfig'; // Update this path to your Firebase config

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(DB,'JobListing');
        const orderSnapshot = await getDocs(ordersCollection);
        const ordersList = orderSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title>Total Orders</Title>
          <Paragraph>{orders.length} Orders</Paragraph>
        </Card.Content>
      </Card>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.orderCard}>
            <Card.Content>
              <Title>Order ID: {item.id}</Title>
              <Paragraph>Customer: {item?.fullName}</Paragraph>
              <Paragraph>Pickup Location: {item.pickupLocation?.address}</Paragraph>
              <Paragraph>Dropoff Location: {item.dropoffLocation?.address}</Paragraph>
              {/* <Paragraph>Status: {item.status}</Paragraph> */}
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default OrderSummary;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      padding: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginVertical: 20,
    },
    summaryCard: {
      backgroundColor: '#4CAF50',
      borderRadius: 10,
      marginVertical: 10,
      padding: 15,
      alignItems: 'center',
    },
    orderCard: {
      marginVertical: 5,
      padding: 10,
      borderRadius: 8,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  