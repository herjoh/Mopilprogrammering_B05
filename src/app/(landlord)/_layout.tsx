import { useAuth } from "@/context/AuthContext";
import { Pressable, Text } from "react-native";
import { Tabs } from "expo-router";

export default function LandlordLayuout(){
    const {switchUser} = useAuth();
    return(
        <Tabs
            screenOptions={{
                headerTintColor: "#7b54e6",
                tabBarActiveTintColor: "#7b54e6",
                tabBarInactiveTintColor: "#888",
                headerRight: () => (
                    <Pressable onPress={() => switchUser("")}>
                        <Text style={{ color: "#7b54e6", marginRight: 12 }}> logg ut</Text>
                    </Pressable>
                ),
            }}
        >
            <Tabs.Screen
                name="landlordHome"
                options={{title: "Hjem", headerTitle: "LandLord Dashboard" }}
            />
            <Tabs.Screen
                name="user_profile"
                options={{ title: "Profil"}}
            />
            </Tabs>
    );
}