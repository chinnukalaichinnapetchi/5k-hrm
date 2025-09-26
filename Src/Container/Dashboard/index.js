import React,{useEffect, useState} from "react";
import {View, Text,ScrollView,StyleSheet,TouchableOpacity,BackHandler,Alert, StatusBar } from "react-native";
import CustomHeader from "../../Components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { getCurrentLocation } from "./LocationService";
import { getCurrentLocationWithAddress } from "./LocationService";
import Loader from "../../Components/Loader";
import { postData } from "../../Api/apiService";

const Dashboard = ({navigation}) => {
    const [checkInLocation, setCheckInLocation] = useState(null);
    const [checkOutLocation, setCheckOutLocation] = useState(null);
    const [Clockinbuttondisable,setClockinbuttondisable]=useState(false);
    const [Clockoutbuttondisable,setClockoutbuttondisable]=useState(true)
    const  [userdata,setUserdata]=useState({})
    const [loading,setLoading]=useState(false)

     useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        console.log('userData', userData);
        setUserdata(userData || {});
      } catch (error) {
        console.log('Error reading userData from AsyncStorage', error);
      }
    };

    fetchUserData();
  }, [])
useEffect(() => {
    const backAction = () => {
      Alert.alert("5K_HRM", "Do you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true; // prevent default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // cleanup on unmount
  }, []);

    const handleCheckIn = async () => {
      setLoading(true)
  try {
    const location = await getCurrentLocationWithAddress();
    console.log("Check-In Location:", location);

    if (location) {
      //setCheckInLocation(location.coords);

      
      const res = await postData("/attendance_clock_in?",{ employee_code: userdata?.employee_code, user_id:userdata?.id,clockin_address:location.address}); 
      console.log("res",res);
      
      if(res.status===200){
             
      setCheckInLocation(location.address);

        setClockinbuttondisable(false);
      setClockinbuttondisable(true);
       setLoading(false)
      }else{
        setLoading(false)
      }
    }
  } catch (err) {
    setLoading(false)
    console.error("Check-In Error:", err);
    if (err.code === 3) {
      alert("Location request timed out. Please ensure GPS is on.");
    } else if (err.code === 1) {
      alert("Permission denied. Please enable location access.");
    } else {
      alert("Unable to fetch location. Try again.");
    }
  }
};
  const handleCheckOut = async () => {
    try {
      const location = await getCurrentLocationWithAddress();
      if (location) {
        setCheckOutLocation(location.address);
        setClockoutbuttondisable(false)
        setClockinbuttondisable(false)
      }
    } catch (err) {
      console.error("Check-Out Error:", err);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1,
    backgroundColor: "#fff",}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <CustomHeader
        username={userdata?.employee_code}
         onMenuPress={() => navigation.toggleDrawer()}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      <ScrollView contentContainerStyle={styles.container}>

        {/* Calendar Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📅  Calendar</Text>
          <Text style={styles.cardSubText}>No events for today</Text>
        </View>

        {/* Mark Attendance Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🕒  Mark Attendance</Text>
          <Text style={styles.cardSubText}>My Office Time: 09:00 to 18:00</Text>
  {checkInLocation && (
  <View>
    <Text style={styles.text}>Clock In at:</Text>
    <Text style={styles.text}>
      {checkInLocation}
      {/* Lat: {checkInLocation.latitude}, Lon: {checkInLocation.longitude} */}
    </Text>
  </View>
)}
      {checkOutLocation && (
  <View>
    <Text style={styles.text}>Clock Out at:</Text>
    <Text style={styles.text}>
      {checkInLocation}
      {/* Lat: {checkInLocation.latitude}, Lon: {checkInLocation.longitude} */}
    </Text>
  </View>

      )}
             <Loader visible={loading}  />

          <View style={styles.buttonRow}>
            <TouchableOpacity disabled={Clockinbuttondisable} onPress={handleCheckIn} style={[styles.clockInBtn,{backgroundColor:Clockinbuttondisable?'grey':'#4ADE80'}]}>
              <Text style={styles.btnText}>CLOCK IN</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={Clockoutbuttondisable} onPress={handleCheckOut} style={[styles.clockOutBtn,{backgroundColor:Clockoutbuttondisable?'grey': '#F87171'}]}>
              <Text style={styles.btnText}>CLOCK OUT</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 26,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  cardSubText: {
    fontSize: 16,
    color: '#6B7280',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  clockInBtn: {
    flex: 1,
   // backgroundColor: '#4ADE80',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  clockOutBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    //textAlign: "center",
  },
});
