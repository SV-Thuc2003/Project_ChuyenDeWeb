export interface LoginCredentials {
    username: string;
    password: string;
    // rememberMe: boolean;
}

// export interface LoginResponse {
//     success: boolean;
//     token?: string;
//     user?: {
//         id: string;
//         name: string;
//         email: string;
//         role: string;
//     };
//     error?: string;
// }
export interface LoginResponse {
    token: string;
    username: string;
    role: string;
    error?: string;
}

export interface SocialLoginProvider {
    name: 'google' | 'facebookfacebook';
    icon: string;
    label: string;
}