import { CasePage } from "@/pages/CasePage";
import { StyleSheet, Text, View } from "react-native";

export default function LandlordHomeScreen() {
  return(
      <View style={styles.container}>
        <Text style={styles.title}>Velkommen til Eiendomsmanager-appen</Text>
        <Text style={styles.subtitle}>Her kan du se alle dine leietakere's saker.</Text>
        <CasePage />
      </View>

  
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#2321c4",
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 30,
      color: "#333",
    },
    linkContainer: {
      width: "80%",
      marginTop: 20,
    },
    link: {
      backgroundColor: "#53095a",
      padding: 15,
      borderRadius: 8,
      marginVertical: 10,
      alignItems: "center",
    },
    linkText: {
      color: "white",
      fontWeight: "bold",
    },
  });
