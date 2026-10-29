import AuthProvider, { useAuth } from "@/context/AuthContext";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";


function RootNavigator() {
  const {user, isLoading, isLoaded, isLoggedIn} = useAuth();
  const ROLE_ROUTES = {landlord: "/landlordHome", tenant: "/tenantHome", admin: "/adminHome"} as const;
  const router = useRouter();
  //const segments = useSegments();

  //Guard to dont load empty space
  useEffect(() => {
    if(isLoading ){SplashScreen.hideAsync();}
  }, [isLoading])

  useEffect(()=> {
    if(!isLoaded || !user?.role) return;
    const path = ROLE_ROUTES[user.role as keyof typeof ROLE_ROUTES];
    if(path) router.replace(path);
  }, [isLoaded, user?.role]);
  
  return(
      <Stack screenOptions={{headerTintColor: "#7b54e6"}}>
        <Stack.Screen name="index" options={{title: "Fiksa"}} />
        <Stack.Screen name="about" options={{title: "About US"}} /> 
        <Stack.Screen name="login" options={{title: "Login"}}/>
        <Stack.Screen name="register" options={{title: "Register"}}/>
        <Stack.Protected guard={user?.role ==="Landlord"}>
          <Stack.Screen name="landlordHome" options={{headerTitle: "Landlord Dashboard"}}/>
        </Stack.Protected>
        <Stack.Protected guard={user?.role ==="Tenant"}>
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