import ProfileScreen from "@/components/profile/screen";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  ProfileScreen()

  return (


    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
