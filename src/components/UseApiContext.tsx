import { RequestInterface } from "./types";

export interface UseApiContext<S extends string> {
    baseUrl: string;
    use: (func: (request: RequestInterface) => void) => Promise<any>;    // middleware 
    factory: (enums: S, requestSpecificConfigurationPayload: unknown) => void;  //
}

// export const UseApiContextProvider = 
