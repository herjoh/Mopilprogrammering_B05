import { API, User as ApiUser } from "@/API";
import type { Property, User } from "@/types/types";

import type { Db } from "./db";

const LANDLORD_POSITIONS = [1, 2, 3];

export async function seedFromApi(base: Db): Promise<Db> {
    const apiUsers: ApiUser[] = await API()

    const users: User[] = apiUsers.map((apiUser, index): User => ({
        id: "u" + (index + 1),
        name: apiUser.name,
        email: apiUser.email,
        password: apiUser.passord,
        role: LANDLORD_POSITIONS.includes(index) ? "Landlord" : "Tenant",
    }));
    const landlords = users.filter((user) => user.role === "Landlord");
    const tenants = users.filter((user) => user.role === "Tenant");


    const properties: Property[] = landlords.map((landlords, index) => ({
        id: "p" +(index +1),
        address: " Storgata " + (index + 1) + ", Halden",
        landlordId: landlords.id,
    }));

    tenants.forEach((tenants, index) => {
        tenants.propertyId = properties[index % properties.length].id;
    });

    return {users, properties, cases: base.cases}
}
