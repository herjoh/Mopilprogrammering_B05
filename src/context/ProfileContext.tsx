import type { Profile } from "@/constants/types";
import { createContext, useContext, useState, type ReactNode } from "react";

type ProfileContextType = {
    profile: Profile | undefined;
    setProfile: (profile: Profile | undefined) => void;
};

//Profile context with base values
const ProfileContext = createContext<ProfileContextType>({
    profile: undefined,
    setProfile: () => {}
})

//props
type ProfileProviderProps = { children: ReactNode};

export function ProfileProvider({children} : ProfileProviderProps){
    const [profile, setProfile] = useState<Profile |undefined>(undefined);

    return(
        <ProfileContext.Provider value={{profile, setProfile}}>
            {children}
        </ProfileContext.Provider>
    );
}

//hook
export function useProfile(){
    const context = useContext(ProfileContext);
    if(!context){
        throw new Error("Use profile must be within a profile provider")
    }
    return useContext(ProfileContext);
}
