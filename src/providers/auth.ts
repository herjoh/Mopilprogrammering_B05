import { Success } from "@/providers/resultTypes";

//const extractRole =(){};

const responseHandler = <T>(response: T): Success<T> =>{
    console.log("Response handler:", response);
    return {success: true, data: response}
}