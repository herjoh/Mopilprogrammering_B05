
//Important start theme - can be changed
import { useState } from 'react';

//Profile functionality
//import { profile_enum } from '@/components/profile/Profile_Enum';

const enum profile_enum {
        Unauthenticated = 1,
        Tenant ,
        Landlord ,
 }

const profileScreen = () => {
    const [currentScreen, setCurrentScreen] = useState(profile_enum.Unauthenticated);

    //Main exportive function that allow the finsihed user to see their probile based on state enum
  
        switch(currentScreen){
            case profile_enum.Tenant : return <p> The user is a tenant</p>
            case profile_enum.Landlord : return <p>The profile is a landlord</p>
            default: return console.log("Initialised")
        }
}

export default function ProfileScreen(){}; 