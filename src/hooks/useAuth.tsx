import { User } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export type Account = {
    user: User | null;
    details: UserDetails | null;
}

export const useAuth = (): Account => {
    const { user, details } = useContext(AuthContext);
    return { user, details };
}