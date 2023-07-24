export interface User {
    id : string;
    name : string;
    bio : string;
    createdDate : string;
    contact : Record<string, string>;
    location : string;
    projects : string[];
    avatarUrl : string;
    email : string;
    password : string;
    phoneNumber : string;
}
export interface Comment{
    id? : string;
    userId : string;
    createdDate : string;
    createdBy : User;
    userfulVotes : number;
    content : string;
}

export interface Project {
    id : string;
    title : string;
    userId : string;
    createdBy : User;
    createdDate : string;
    tags : string[];
    support : number;
    views : number;
    content : string;
    comments : Comment[];
}

// export interface UserData {
//     avatarUrl : string,
//     bio : string | null,
//     contact : Record<string, string>,
//     createdDate : string,
//     email : string,
//     id : string,
//     location : string | null,
//     name : string,
//     password : string | null,
//     phoneNumber : string | null,
//     projects : Project[],

// }