export type Role = "admin" | "manager" | "supervisor" | "general user";

export type Contact = {
    id : number,
    firstName : string,
    lastName : string,
    phoneNumber : string,
    email : string,
}