import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Lille hjælpe-hook, så komponenter kan skrive useAuthContext() i stedet for
// useContext(AuthContext). Giver adgang til token, user, login og logout.
export const useAuthContext = () => useContext(AuthContext);
