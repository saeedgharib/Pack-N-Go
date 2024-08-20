import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useUser } from "@clerk/clerk-expo";
import { PaperProvider } from "react-native-paper";
// MY CODE HERE

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
console.log(CLERK_PUBLISHABLE_KEY);
const tokenCache = {
  async getToken(key) { 
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null; 
    }   
  },
  async saveToken(key, value) { 
    try {     
      return SecureStore.setItemAsync(key, value);   
    } catch (error) {
      return;  
    }  
  }, 
};
 
const InitialLayout = () => {  
  const { isLoaded, isSignedIn } = useAuth();  
  const segments = useSegments();    
  const router = useRouter();  
  const [isUser, setIsUser] = useState(false);   
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDriver, setIsDriver] = useState(false);   
  const { user } = useUser();  
     
  const showData = async () => {   
    if (user?.unsafeMetadata.role == "driver") {
      setIsDriver(true);
      setIsUser(false);
      setIsAdmin(false); 
    } else if (user?.unsafeMetadata.role == "user"){
      setIsUser(true);
      setIsDriver(false);
      setIsAdmin(false);
    } else if (user?.unsafeMetadata.role == "admin")  {  
      setIsAdmin(true);
      setIsDriver(false);
      setIsUser(false);
    }
  }; 
  useEffect(() => {
    if (!isLoaded) return;
 
    const inAdminGroup = segments[0] === "(admin)";
    const inUsersGroup = segments[1] === "(users)"; 
    const inDriversGroup = segments[2] === "(driver)";   

    if (isSignedIn) {
      showData();
 
      if (isDriver && !inDriversGroup) {
         router.replace("(driver)/DriversHomePage"); 
      }
      if (isUser && !inUsersGroup) { 
    
         router.replace("(users)/(tabs)/UserHomePage")                                     
      }   
      if (isAdmin && !inAdminGroup) { 
         router.replace("(admin)/AdminHomePage")                   
      } 
    } else { 
      router.replace("/Login");  
    } 
  }, [isSignedIn]); 
  
  return <Slot />; 
}; 
 
const RootLayoutNav = () => {    
  return (  
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >  
      <PaperProvider>  
        <InitialLayout /> 
      </PaperProvider> 
    </ClerkProvider> 
  ); 
}; 
 
export default RootLayoutNav;
     