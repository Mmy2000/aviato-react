import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("userTaken");
    if (storedToken) {
      setUserLogin(storedToken);
    }
  }, []);

  const updateUserLogin = (token) => {
    localStorage.setItem("userTaken", token);
    setUserLogin(token);
  };

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin: updateUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
