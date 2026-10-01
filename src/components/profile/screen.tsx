
//Important start theme - can be changed
import { useColorScheme } from 'react-native';

//Profile functionality
import { profile_enum } from '@/components/profile/Profile_Enum';

export default function ProfileScreen(){

    const scheme = useColorScheme();

    //Main exportive function that allow the finsihed user to see their probile based on state enum
    function profileState(state : profile_enum){
        switch(state){
            case profile_enum.Unauthenticated:
                console.log("The user isnt autheticated");
                break;
            case profile_enum.Tenant:
                console.log("The user is a tenant");
                break;
            case profile_enum.Landlord:
                console.log("The user is a landlord");
                break;
            
            default:
                console.log("unregonised profier");
        }

    }
}