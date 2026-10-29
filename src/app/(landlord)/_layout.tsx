import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { Pressable, Text } from "react-native";

export default function LandlordLayuout(){
    const {switchUser} = useAuth();
    return(
        <Stack screenOptions={{headerRight: () => <Pressable onPress={() => switchUser("")}><Text style={{color: "#7b54e6", marginRight: 12}}>Logg ut</Text></Pressable>}}>
            <Stack.Screen name="landlordHome" options={{headerShown:true, headerTitle:"Landlord Dashboard"}}/>
            <Stack.Screen name="user_Profile"/>
        </Stack>
    )
}