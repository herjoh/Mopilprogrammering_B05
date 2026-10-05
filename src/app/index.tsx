import { profile_states } from '@/components/profile/Profile_Enum';
import { useState, } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

type ProfileState = typeof profile_states[keyof typeof profile_states];

const ProfileScreen = ({state} : {state: ProfileState}) => {
  switch(state){
            case profile_states.Tenant : return <Text> The profile is a tenant</Text>
            case profile_states.Landlord : return <Text>The profile is a landlord</Text>
            default: return <Text>Unauthenticated</Text>;
        };
}


export default function Index() {
    const [currentScreen, setCurrentScreen] = useState<ProfileState>(profile_states.Unauthenticated);
    console.log("pressed, current:", currentScreen);
    const nextState = () => setCurrentScreen((prev) => ((prev + 1 ) % 3) as ProfileState);

  return (

    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.container}>
          <Text> This is a test. Click buttom to loop through useStates and enums to show different profile functions </Text>
          <ProfileScreen state={currentScreen} />
          <Pressable onPress={() => {
              console.log("Register press");
              nextState()}}>
                <Text style={styles.text}>Click ME!</Text>


          </Pressable>
          <Text>State Value: {currentScreen}</Text>

        </View>
      </ScrollView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 30, // Font size for the text
    fontWeight: 'bold', // Bold font weight
  },
});
