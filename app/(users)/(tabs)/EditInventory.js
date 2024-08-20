import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Pressable ,TextInput, Dimensions, ScrollView} from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { setDoc, collection, doc,getDoc } from 'firebase/firestore';
import DB from '../../../database/firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { router, useLocalSearchParams } from 'expo-router';
import Spinner from 'react-native-loading-spinner-overlay';

const  EditInventory= () => {
    const { user}=useUser() 
    const params = useLocalSearchParams()
    const ID=params.id
   const [data,setData]=useState([])
  const [selectedImage, setSelectedImage] = useState("");
  const [isFragile, setIsFragile] = useState();
  const [length,setLength] = useState();
  const [width, setWidth] = useState();
  const [ImageUrl, setImageUrl] = useState();
const [name, setName] = useState();
const [loading, setLoading] = useState();
//   const [selectedImage, setSelectedImage] = useState("");

 
  // Function to handle image selection
  const handleImagePicked = async (result) => {
    try {
      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
        console.log(result.assets[0].uri);
       
      }
    } catch (error) {
      console.log('Error handling image picker:', error);
    }
  };

  // Function to open camera and take picture
  const takePicture = async () => {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access camera is required!');
        }
      }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result);
  };


  const getOrderDetails=async()=>{
    try {
        console.log(ID)
        // const docRef = doc(DB,"inventory", ID);
    const docSnap = await getDoc(doc(DB,"inventory", ID));

        console.log("Document data:", docSnap.data());
    
    
      setData(docSnap.data());
      
      setIsFragile(data.isFragile);
        setLength(data.length);
        setWidth(data.width); 
        setSelectedImage(data.image);
        setName(data.name);

        setLoading(false)
        
    } catch (error) {
        
        console.log("No such document!");
    }

  // docSnap.data() will be undefined in this case
}




  useEffect(() => {
    setLoading(true);
    getOrderDetails();
    // getOrderDetails();
  }, [])

  // Function to open gallery and select image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    handleImagePicked(result);
  };

  const addToInventory=async() => {
    try {
        
        await setDoc(doc(DB,"inventory",ID),{
            name:name,
            refId:user?.id,
            image:selectedImage,
            length:length,
            width:width,
            area:length*width,
            isFragile:isFragile,
    
        })
        setIsFragile(false);
        setLength(null);
        setWidth(null); 
        setSelectedImage(null);
        router.replace("Inventory")
    } catch (error) {
        console.log(error);
    }
  }
  const removeImage = () => {
    console.log('Removing image');
    setSelectedImage(null);
  };
  return (
    <ScrollView>
    <Spinner visible={loading}></Spinner>
    <View style={styles.container}>
      
    <Text></Text>
      <View style={styles.imageContainer} >
        {selectedImage ? (
            <>
            <Pressable
             style={styles.closeButton} onPress={removeImage}>
              <Ionicons name="close-circle" size={24} color="red" />
            </Pressable>
          <Image source={{uri:selectedImage}} style={styles.image} />
            </>
        ) : (
            <>

          <Button icon="camera" mode="contained" onPress={()=>takePicture()} buttonColor='gray'>
            Take Picture
          </Button>
          <Text>or</Text>
          <Button icon="image" mode="contained" onPress={pickImage} buttonColor='gray'>
        Insert from gallery
      </Button>
            </>
        )}
        
      </View>
      <View style={styles.inputView}>
      <Text style={styles.header}>Name</Text>
            <TextInput
        
              style={styles.input}
              
              placeholder="chair or table etc"
      
              value={name}
              onChangeText={setName}
              autoCorrect={false}
              autoCapitalize="none"
            />
    
          </View>
      <Text style={styles.header}>Dimensions</Text>
      <View style={styles.inputRow}>
      <Text style={styles.header}>Length</Text>
            <TextInput
              style={styles.Dimensions}
              placeholder="Length"
              value={length}
              onChangeText={setLength}
              autoCorrect={false}
              autoCapitalize="none"
            />
      <Text style={styles.header}>Width</Text>
            <TextInput
              style={styles.Dimensions}
              placeholder=" Width"
              value={width}
              onChangeText={setWidth}
              autoCorrect={false}
              autoCapitalize="none"
            />
            </View>
      <View style={styles.inputView}>
      <Text style={styles.header}>Area</Text>
            <TextInput
        
              style={styles.input}
              selectTextOnFocus={false}
              editable={false}
              placeholder={length && width ? length*width +"m^2":"..."}
              value={length*width}
              aria-disabled={true}
              autoCorrect={false}
              autoCapitalize="none"
            />
    
          </View>
          <View >

        <Text style={styles.header}>Is Fragile</Text>
     <RadioButton.Group style={styles.inputRow} onValueChange={newValue => setIsFragile(newValue)} value={isFragile}>
      <View style={styles.inputRow}>
        <Text>Yes</Text>
        <RadioButton value={true} />
      
      
        <Text>No</Text>
        <View style={{borderWidth:1,marginLeft:10,borderRadius:90,backgroundColor:'none'}}>

        <RadioButton value={false} />
        </View>
      </View>
    </RadioButton.Group>
          </View>
          <Button icon='' onPress={()=>addToInventory()}>Save</Button>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
    
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 20,
  },
  imageContainer: {
    width: 400,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
   zIndex:-1,
    // overflow: 'hidden',
    padding: 10, // Padding 10px
    backgroundColor: '#d1d1cf', // Background color grey
    shadowColor: 'white', // Box shadow color black
    shadowOffset: { width:1, height:1 }, // Box shadow offset
    shadowOpacity: 1, 
    // Box shadow opacity
    shadowRadius: 1, // Box shadow radius
    elevation:5,
    borderRadius: 10,
    borderWidth: 0,
    
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    zIndex:9
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Adjust resizeMode as per your requirement
  },
inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 7,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  Dimensions:{
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 10,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 7,
  }

});

export default EditInventory;
