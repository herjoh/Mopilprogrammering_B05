import { Stack } from "expo-router";

export default function TenantLayuout(){
    return(
        <Stack>
            <Stack.Screen name="tenantHome" options={{headerShown:true, headerTitle:"Tenant Dashboard"}}/>
            <Stack.Screen name="user_Profile"/>
        </Stack>
    )
}