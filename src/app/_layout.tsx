import AuthProvider, { useAuth } from "@/context/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";


function RootNavigator() {
  const {user, isLoading} = useAuth();
  const router = useRouter();
  const segments = useSegments();
  if (isLoading) return null;

  useEffect(()=> {
    if(!isLoading) return;
    const authRoutes = ["(admin)", "(landlord)", "(tenant)"].includes(segments[0]);

  })
  
  return(
      <Stack screenOptions={{headerTintColor: "#7b54e6"}}>
        <Stack.Screen name="index" options={{title: "Fiksa"}} />
        <Stack.Screen name="about" options={{title: "About US"}} /> 
        <Stack.Screen name="login" options={{title: "Login"}}/>
        <Stack.Screen name="register" options={{title: "Register"}}/>
        <Stack.Protected guard={user?.role ==="landlord"}>
          <Stack.Screen name="landlordHome" options={{headerTitle: "Landlord Dashboard"}}/>
        </Stack.Protected>
        <Stack.Protected guard={user?.role ==="tenant"}>
          <Stack.Screen name="tenantHome" options={{headerTitle: "Tenant Home"}}/>
        </Stack.Protected>
      </Stack>

  );
}

export default function RootLayout(){
  return(
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )

}