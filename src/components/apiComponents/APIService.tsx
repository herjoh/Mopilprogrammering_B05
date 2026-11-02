import { getUsers, resetDbFromApi } from "@/data/fakeDb";
import type { User } from "@/types/types";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

type SafeUser = User;

export function UserList() {
  const [users, setUsers] = useState<SafeUser[]>([]);

  async function load() {
    const allUsers = await getUsers();
    setUsers(allUsers.map(({ ...password }) => password));
  }

  useEffect(() => {
    load();
  }, []);

  async function regenerate() {
    await resetDbFromApi();
    await load();
  }

  return (
    <View>
      <Pressable onPress={regenerate}>
        <Text>Hent brukere på nytt fra API</Text>
      </Pressable>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} ({item.role})</Text>
            <Text>{item.email}</Text>
            <Text>{item.password}</Text>
          </View>
        )}
      />
    </View>
  );
}
