
//Important start theme - can be changed
import { useState, } from 'react';

//Profile functionality
import { profile_states } from '@/components/profile/Profile_Enum';

//derive union type from import,
type ProfileState = typeof profile_states[keyof typeof profile_states];

export const ProfileScrean = () => {
    const [currentScreen, setCurrentScreen] = useState<ProfileState>(profile_states.Unauthenticated);

    //Main exportive function that allow the finsihed user to see their probile based on state enum       
        switch(currentScreen){
            case profile_states.Tenant : return <p> The user is a tenant</p>
            case profile_states.Landlord : return <p>The profile is a landlord</p>
            default: return null;
        };
  
       
}

//Export profile screen
//export function ProfileScrean(); 