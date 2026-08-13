import { createContext } from "react";

/* Selve context-objektet ligger i sin egen fil (adskilt fra AuthProvider),
   så Vites "fast refresh" fungerer korrekt. Provideren findes i AuthProvider.jsx. */
export const AuthContext = createContext();
