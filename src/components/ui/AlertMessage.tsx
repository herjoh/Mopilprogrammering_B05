import {View, Text, StyleSheet} from "react-native";

type AlretMessageProps = {
    message: string;
};

export default function AlretMessageProps({
    message,
}: AlretMessageProps){
    if (!message) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
        </View>    
    );
}

const styles = StyleSheet.create ({
    container: {
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: "#ffe5e5",
    },

    message: {
        color: "#cc0000"
        fontSize: 14,
    },
});
