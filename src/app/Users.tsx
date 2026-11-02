import { UserList } from "@/components/apiComponents/APIService";
import { Text, View } from "react-native";
export default function Users () {
    return (
        <View>
            <Text>Brukere mulig å logge inn med!</Text>
            <UserList />
        </View>
    )
}