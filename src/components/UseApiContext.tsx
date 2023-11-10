import React from "react";
import { Configuration, RequestInterface } from "./types";

export type ApiContextProps<S extends string> = {
    factory: (enums: S, request: RequestInterface) => Promise<any>;
    use?: (func: (request: RequestInterface) => void) => Promise<any>;    // middleware 
} & Configuration

export const ApiContext = React.createContext<ApiContextProps<any> | null>(null)

export const useApiContext = () => {
    const context = React.useContext(ApiContext);
    if (!context) {
        throw new Error("Context for use-api not provided!");
    }

    return context
} 