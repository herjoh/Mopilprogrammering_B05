import type { User } from "@/constants/types";
import { getUserResult } from "@/data/fakeDb";
import { createContext, use, useEffect, useState } from "react";


type AuthContextSchema = {
    user: User | null,
    isLoading: boolean,
    switchUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextSchema | null>(null);

//main component
export default function AuthProvider({children}: {children : React.ReactNode}){
    const [userId, setUserId] = useState<string>("u1");
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      let cancelled = false;
      setIsLoading (true);
      getUserResult(userId)
        .then((result) => {
          if(!cancelled) setUser(result.success ? result.data : null);
        })
        .finally(() => {
          if(!cancelled) setIsLoading(false);
        })
        return () =>{ cancelled = true}; 
    }, [userId]);


   return(
    <AuthContext.Provider value={{user,isLoading,switchUser: setUserId}}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
