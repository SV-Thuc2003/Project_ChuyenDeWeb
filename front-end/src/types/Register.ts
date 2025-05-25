export interface RegisterFormData {
    username: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
}

export interface RegisterFormErrors {
    username?: string;
    name?:string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    termsAccepted?: string;
}