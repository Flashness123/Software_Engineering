// vue3-google-signin.d.ts
declare module 'vue3-google-signin' {
    export const useTokenClient: any;
    export type AuthCodeFlowSuccessResponse = any;
    export type AuthCodeFlowErrorResponse = any;

    export interface GoogleSignInOptions {
        clientId: string;
    }
    export const GoogleSignInPlugin: {
        install: (app: any, options: GoogleSignInOptions) => void;
    };
}