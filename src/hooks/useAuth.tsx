import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export const useAuth = () => {
    const { user, details, setDetails, setUser } = useContext(AuthContext);
    return { user, details, setDetails, setUser };
}