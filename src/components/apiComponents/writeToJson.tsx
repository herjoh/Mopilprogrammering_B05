// UserList.tsx
import { API, User } from "@/API";
import { File, Paths } from "expo-file-system";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

type SafeUser = Omit<User, "passord">;

const MAX_USERS = 20;

export function UserList() {
  const [users, setUsers] = useState<SafeUser[]>([]);

  useEffect(() => {
    async function load() {
      const data = await API();
      const all: User[] = data.slice(0, MAX_USERS);

    
      setUsers(all.map(({ passord, ...rest }) => rest));

      
      try {
        const file = new File(Paths.document, "users.json");
        if (!file.exists) file.create();
        file.write(JSON.stringify(all, null, 2));
        console.log("Lagret til", file.uri);
      } catch (error) {
        console.log("Klarte ikke å skrive filen", error);
      }
    }

    load();
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(user) => String(user.id)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.tlfnr}</Text>
          </View>
        )}
      />
    </View>
  );
}