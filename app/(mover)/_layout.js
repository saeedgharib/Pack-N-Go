import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth, useUser} from '@clerk/clerk-expo';
import { useEffect } from 'react';

export const LogoutButton = () => {
  const {signOut} = useAuth()
  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={'#fff'} />
    </Pressable>
  );
};


const TabsPage = () => {
  const { isSignedIn } = useAuth();
const {user}=useUser();
 
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6c47ff',
        },
        headerTintColor: '#fff',
        headerRight:()=>{return<LogoutButton/>}
      }}>
      <Tabs.Screen
        name="DriversHomePage"
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarLabel: 'Home',
          
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerTitle: 'My Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          tabBarLabel: 'My Profile',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;