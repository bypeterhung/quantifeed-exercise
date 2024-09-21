import { createContext } from "react";

export interface AppContextType {
  activeUser?: {
    id: string;
    name: string;
    email: string;
    locale: {
      number: string;
      datePattern: string;
    };
    token: string;
  };
  currencies?: string[];
  // ... more frequently used data cached in context
}

export const AppContext = createContext<AppContextType>({});
