import { User, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth, getAccountDetails } from '../services/firebase';

type Props = {
    children: React.ReactNode
}

type AuthContextType = {
    user: User | null,
    setUser: (user: User | null) => void,
    details: UserDetails | null,
    setDetails: (details: UserDetails | null) => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    details: null,
    setDetails: () => { }
});



const Auth = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(auth.currentUser);
    const [details, setDetails] = useState<UserDetails | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                getAccountDetails(currentUser?.uid).then((data) => {
                    setDetails(data);
                });
            }
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user, setUser, details, setDetails }}>
        {children}
    </AuthContext.Provider>;
}

export default Auth