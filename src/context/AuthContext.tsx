import { User, ROLES } from "@/constants/types";
import { createContext, use, useCallback, useEffect, useState } from "react";
import { getUser, getUsers } from "@/data/fakeDb";


type AuthContextSchema = {
    user: User | null,
    isLoading: boolean,
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, admin: boolean) => Promise<void>;
    logout: () => Promise<void>
    isAdmin: boolean;
    isLoggedIn: boolean;
    isLoaded: boolean;
}

const AuthContext = createContext<AuthContextSchema>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isAdmin: false,
  isLoggedIn: false,
  isLoaded: false,
});

//main component
export default function AuthProvider({children,}: {children : React.ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(true);

    //helper to reset the laoding flags
    const resetLoading = useCallback(() =>{
        setLoading(false); setIsLoaded(true)}, []);
    const setLoadingState = useCallback(() =>{
        setLoading(true); setIsLoaded(false)}, []);
    
    
    useEffect(() => {
        const fetchUserData = async () =>{
            setLoading(true);
            const result = await getUsers();
            setUser
        }
    })


   return(
    <AuthContext.Provider
     value={{
        user,
        isLoading: loading,
        isAdmin: !!(user?.role === ROLES.ADMIN),
        isLoaded,
        isLoggedIn: !!(user !== null),
     
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


}


export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
