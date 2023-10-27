export interface RegisterForm {
    [x: string]: any;
    username: String;
    email: String;
    password: String;
}

export interface LoginForm {
    username: String;
    password: String;
}

export interface LoginResponse {
    [x: string]: any;
    accesToken: String;
    refreshToken: String;
    expireAt: number;
}

export interface CreateTask {
    task: String;
    description: String;
    priority: String;
}

export interface UpdateTask {
    _id: String;
    task: string;
    description: string;
    priority: string;
    status: string;
}

export type UpdateTaskForm = Omit<UpdateTask, '_id'>

export interface GetTodoList {
    _id: String;
    task: String;
    description: String;
    priority: String;
    status: String;
    createdAt: Date;
    updatedAt: Date;
    author: String;
}

export const BaseUrl = "https://thoughtful-pear-knickers.cyclic.app";