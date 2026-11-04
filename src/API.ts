export interface User {
    id: number;
    name: string;
    email: string;
    tlfnr: number;
    passord: string;
}




export async function API(): Promise<User[]> {
    try {
    const response = await fetch("https://dummyjson.com/users?limit=20")
    if (!response.ok) {
        throw new Error(`HTTP-feil: ${response.status}`);
    }

    const json = await response.json()


    return json.users.map((user: any): User => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      tlfnr: user.phone,
      passord: user.password,
    }));
    }
    catch(error) {
        console.log("Klarte ikke å hente data fra API-et", error)
    }
    return []
}
