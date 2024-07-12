import { useState } from "react"
import { auth, getAccountDetails } from "../services/firebase"
import { User } from "firebase/auth"

export type Account = {
    user: User | null;
    details: UserDetails | null;
}

export const useAuth = (): Account => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const [details, setDetails] = useState<UserDetails | null>(null);

    auth.onAuthStateChanged((user) => {
        if (user) {
            setCurrentUser(user);
            getAccountDetails(user?.uid)
                .then((data) => {
                    setDetails(data);
                });
        }
    });



    return { user: currentUser, details };
}