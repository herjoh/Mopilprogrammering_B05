import { useAuth } from "@/context/AuthContext";
import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, Text } from "react-native";

export default function TenantLayuout(){
    const {switchUser} = useAuth();

    return(
        <Tabs
            screenOptions={{
                headerTintColor: "#7b54e6",
                tabBarActiveTintColor: "#7b54e6",
                tabBarInactiveTintColor: "#888",
                headerRight: () => (
                    <Pressable onPress={() => switchUser("")}>
                        <Text style={{ color: "#7b54e6", marginRight: 12 }}> Logg ut</Text>
                    </Pressable>
                ),
            }}
        >
            <Tabs.Screen
                name="tenantHome"
                options={{
                    title: "Hjem",
                    headerTitle: "Tenant Dashboard",
                    tabBarIcon: ({ color, size}) => (
                        <SymbolView
                            name={{ ios: "house.fill", android: "home", web: "home"}}
                            tintColor={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="user_profile"
                options={{
                    title: "Profil",
                    tabBarIcon: ({ color, size}) => (
                        <SymbolView
                            name= {{ ios: "person.fill", android: "person", web: "person"}}
                            tintColor={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}