import { Stack } from "expo-router";

export default function LandlordLayuout(){
    return(
        <Stack>
            <Stack.Screen name="landlordHome" options={{headerShown:true, headerTitle:"Landlord Dashboard"}}/>
            <Stack.Screen name="user_Profile"/>
        </Stack>
    )
}