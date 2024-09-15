import { createContext } from "react";

export const SignContext = createContext(null);

const SignContextProvider =  (props) => {
    const url = "http://localhost:3000";

    const contextValue = {
        url
    }
    
    return(
        <SignContext.Provider value={contextValue}>
            {props.children}
        </SignContext.Provider>
    )
}

export default SignContextProvider


