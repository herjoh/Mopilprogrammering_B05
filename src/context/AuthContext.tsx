import { getUserResult } from "@/data/fakeDb";
import type { Role, User } from "@/types/types";
import { createContext, use, useCallback, useEffect, useState } from "react";


type AuthContextSchema = {
    user: User | null,
    isLoading: boolean,
    role: Role | null,
    login: (email: string, password: string) => Promise<void>,
    switchUser: (id: string) => void;
    isLoggedIn: boolean,
    isLoaded: boolean,
}

const AuthContext = createContext<AuthContextSchema>({
  user: null,
  isLoading : true,
  role: null,
  login: async () => {},
  switchUser: async () => {},
  isLoggedIn: false,
  isLoaded: false
});

//main component
export default function AuthProvider({children}: {children : React.ReactNode}){
    const [userId, setUserId] = useState<string>("");
    const [user, setUser] = useState<User | null>(null)
    const [loading, setIsLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);


    //resetloading
    const resetLoading = useCallback(() => {
      setIsLoading(false); setIsLoaded(true);
    },[]);
    //setloading
    const setLoadings = useCallback(() => {
      setIsLoading(true); setIsLoaded(false);
    }, []);

    const logInUser = async(email: string, password: string) => {
      setLoadings();
      const result = await getUserResult(userId); // midlertidig til innlogging med e-post/passord finnes
      setUser(result.success ? result.data : null);
      resetLoading();
    }

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
    <AuthContext.Provider value={{user,isLoading: loading, role: user?.role ?? null, isLoaded, isLoggedIn: !!(user !== null), login: logInUser,switchUser: setUserId}}>
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
