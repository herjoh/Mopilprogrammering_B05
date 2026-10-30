import { ThemeProvider, useTheme } from "@/components/ui/theme/themeProvider";
import AuthProvider, { useAuth } from "@/context/AuthContext";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";

function RootNavigator() {
  const {user, isLoading, isLoggedIn} = useAuth();
  const { colors, spacing, radii, fontSizes, shadows, screen } = useTheme();
  const ROLE_ROUTES = {Landlord: "/landlordHome", Tenant: "/tenantHome", ADMIN: "/adminHome"} as const;
  const router = useRouter();
  //const segments = useSegments();

  //Guard to dont load empty space
  useEffect(() => {
    if(isLoading ){SplashScreen.hideAsync();}
  }, [isLoading])

  useEffect(()=> {
    if(isLoading || !user?.role) return;
    const path = ROLE_ROUTES[user.role as keyof typeof ROLE_ROUTES];
    if(path) router.replace(path);
  }, [isLoading, user?.role]);
  
  return(
      <Stack screenOptions={{headerStyle: {backgroundColor: colors.primary}, headerTintColor: colors.secondaryTint, contentStyle: {backgroundColor: colors.background}}}>
          <Stack.Screen name="index" options={{title: "Fiksa"}} />
          <Stack.Screen name="about" options={{title: "About US"}} /> 
          <Stack.Screen name="login" options={{title: "Login"}}/>
          <Stack.Screen name="register" options={{title: "Register"}}/>
          
          <Stack.Protected guard={user?.role ==="Landlord"}>
            <Stack.Screen name="(landlord)" options={{headerShown: false}}/>
          </Stack.Protected>
          <Stack.Protected guard={user?.role ==="Tenant"}>
            <Stack.Screen name="(tenant)" options={{headerShown: false}}/>
          </Stack.Protected>
          <Stack.Protected guard={user?.role ==="ADMIN"}>
            <Stack.Screen name="(admin)/adminHome" options={{headerTitle: "Admin"}}/>
          </Stack.Protected>
      </Stack>
  );
}

export default function RootLayout(){
  return(
    <ThemeProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>

  )
}
