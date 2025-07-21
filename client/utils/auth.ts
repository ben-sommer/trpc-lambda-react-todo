import { Amplify } from "aws-amplify";
import {
    COGNITO_USER_POOL_ID,
    COGNITO_IDENTITY_POOL_ID,
    COGNITO_USER_POOL_CLIENT_ID,
} from "./env";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: COGNITO_USER_POOL_ID,
            userPoolClientId: COGNITO_USER_POOL_CLIENT_ID,
            identityPoolId: COGNITO_IDENTITY_POOL_ID,
            loginWith: {
                email: true,
            },
            signUpVerificationMethod: "code",
            userAttributes: {
                email: {
                    required: true,
                },
            },
            allowGuestAccess: false,
            passwordFormat: {
                minLength: 8,
                requireLowercase: true,
                requireUppercase: true,
                requireNumbers: true,
                requireSpecialCharacters: true,
            },
        },
    },
});
