
import React ,{useEffect,useState}from 'react';
import { ScrollView, View, Image, StyleSheet,FlatList } from 'react-native';
import { Text, TextInput,Button,Card,Avatar } from 'react-native-paper';
import { getDoc,doc, setDoc, collection, addDoc, getDocs, where,query,updateDoc } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import DB from '../../database/firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import StarRating from './RatingMovers';

const CompanyProfile = ({cardid}) => {
    const badWords = ['shit',"bad1"];

    const clean = (text) => {
      const regex = new RegExp(`\\b(${badWords.join('|')})\\b`, 'gi');
      return text.replace(regex, '****');
      
    };
    
    const addWords = (...words) => {
      badWords.push(...words);
    };

   
    const {user}=useUser()
   
   
   const [loading,setLoading]=useState()
   const [Details,setDetails]=useState([])
   const [feedback, setFeedback] = useState('');
   const [feedbackList, setFeedbackList] = useState([]);

    const getDetails=async () =>{
        
        const docRef = doc(DB, "companies", cardid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setDetails(docSnap.data());
            
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
    }

    const getFeedback=async () =>{
        try {
            console.log("CardID: "+cardid)
            const feedbackQuery = query(collection(DB,'feedback'), where('companyId', '==', cardid));
      const querySnapshot = await getDocs(feedbackQuery);
        const feedbackData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(feedbackData)
        setFeedbackList(feedbackData);
        setLoading(false)
       
        } catch (error) {
            console.log("An error occurred",error)
        }
    
            // docSnap.data() will be undefined in this case
              
    }
   

    useEffect(() => {
        setLoading(true)   
        getDetails()
        getFeedback()
    },[cardid])


  const handleAddFeedback = async() => {
    setFeedback(clean(feedback));
   
    console.log(feedback)
    try {
       let newFeedback= await clean(feedback);
       setFeedback(newFeedback);
        const docRef = await addDoc(collection(DB, "feedback"), {
            userId:user?.id,
            companyName:Details.name,
            companyId:cardid,
            name:user?.fullName,
            email:user?.emailAddresses[0].emailAddress,
            feedback:feedback,
          });
        // await setDoc(doc(DB,"feedback",id),{
        //     userId:user?.id,
        //     name:user?.fullName,
        //     email:user?.emailAddresses[0].emailAddress,
        //     feedback:feedback,
        // })
        console.log("feedback added")
        setFeedback(null)
        getFeedback()
    } catch (error) {
        console.log(error)
    }
  };

console.log(Details.username);


    return (
      
        
        <View style={styles.container}>
        <Spinner visible={loading}></Spinner>
      <View style={styles.header}>
        <Image source={{uri:Details.logo}} style={styles.logo} />
        <Text style={styles.title}>{Details.name}</Text>
      </View>
      <Text style={styles.description}>{Details.summary}</Text>
      <Text style={styles.description}>{Details.description}</Text>
      <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
           
      <Text style={styles.feedbackTitle}>Feedback:</Text>
      <StarRating   moverId={Details.id}/>
      
    </View>
      <FlatList
        data={feedbackList}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.feedbackCard}>
            <Card.Content style={styles.cardContent}>
              <Avatar.Image size={40} source={item} />
              <View style={styles.feedbackTextContainer}>
                <Text style={styles.username}>{item.name}</Text>
                <Text>{clean(item.feedback)}</Text>
              </View>
            </Card.Content>
          </Card>
        )}
        style={styles.feedbackList}
        contentContainerStyle={styles.feedbackListContainer}
      />
       <TextInput 
        label="Feedback" 
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
    
        numberOfLines={4}
        style={styles.input}
      />
    <Button mode="contained" onPress={()=>handleAddFeedback()} style={styles.button}>
        Submit Feedback
      </Button>
    </View>

    
  );
};
export default CompanyProfile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      alignItems: 'center',
      marginBottom: 16,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
      marginBottom: 16,
    },
    input: {
      marginTop: 16,
      marginBottom: 8,
    },
    button: {
      marginBottom: 16,
    },
    feedbackTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    feedbackList: {
      marginBottom: 16,
    },
    feedbackListContainer: {
      paddingLeft: 16,
    },
    feedbackCard: {
      marginRight: 16,
      marginTop:10,
      padding: 10,
      height:90,
      minWidth: 270,
      justifyContent: 'center',
    },
    cardContent: {
      flexDirection: 'row',
    },
    feedbackTextContainer: {
      marginLeft: 10,
    },
    username: {
      fontWeight: 'bold',
    },
  });