import { Failure, Result, Success } from "../types/resultTypes";

const responseHandler = <T>(response: T): Success<T> =>{
    console.log("Response handler:", response);
    return {success: true, data: response}
}

const errorHandler = (error: unknown): Failure =>{
    console.log("Error handler:", error);
    return{success: false, error: "Error message from error Handler"}
}

export const asyncWrapper = async<T>(operation: () => Promise<T>): Promise<Result<T>> =>{
    try{
        const response = await operation();
        return responseHandler(response);
    }catch(error: unknown){
        return errorHandler(error);
    }
    
};