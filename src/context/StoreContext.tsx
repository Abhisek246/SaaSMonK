import { createContext, ReactNode, useState } from "react";

export const StoreContext = createContext({});

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
    const [id, setId] = useState('');

  return (
    <StoreContext.Provider value={{id, setId}}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
