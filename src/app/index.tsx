import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function Index() {
    const {switchUser} = useAuth();
  
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Fiksa!!!</Text>
      <Text style={styles.subtitle}>Fiksa dit problem!</Text>

      <View style={styles.linkContainer}>
        <Link href="/login" style={styles.link}>Login</Link>
      </View>
      <View style={styles.linkContainer}>
        <Link href="/about" style={styles.link}>About</Link>
      </View>
      <View style={styles.linkContainer}>
        <Pressable style={styles.link} onPress={() => switchUser("u1")}>
          <Text style={styles.linkText}>Fortsett som Kari (leietaker)</Text>
        </Pressable>
      </View>
      <View style={styles.linkContainer}>
        <Pressable style={styles.link} onPress={() => switchUser("u2")}>
          <Text style={styles.linkText}>Fortsett som Ola (utleier)</Text>
        </Pressable>
      </View>

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