import { Stack, Tabs, router } from 'expo-router';
import { Ionicons,MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth} from '@clerk/clerk-expo';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';


export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={'#fff'} />
    </Pressable>
  );
};
export const ProfileButton = () => {


  const gotoProfile = () => {
    router.push('Profile')
  };

  return (
    <Pressable onPress={gotoProfile} style={{ marginRight: 10 }}>
      <Ionicons name="person-outline" size={24} color={'#fff'} />
    </Pressable>
  );
};

const AdminTabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
  <Stack screenOptions={{
    statusBarColor:'secondary',
    headerStyle:{
      backgroundColor:'black',
      
    },
    headerTintColor:'#fff',
    
  }}>
    <Stack.Screen name='AdminHomePage' options={{
      title: 'Admin',
      
    }} />
  </Stack>
    
  
  );
};

export default AdminTabsPage;