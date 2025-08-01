import { OpenAPI } from '@defuse-protocol/one-click-sdk-typescript';

// Configure the SDK
OpenAPI.BASE = 'https://1click.chaindefuser.com'; // API endpoint from OpenAPI spec

// JWT Token Configuration (REQUIRED for authenticated endpoints)
// Replace with your valid JWT token - this is required for most endpoints
export const JWT_TOKEN = 'YOUR_JWT_TOKEN';

// Set the token globally
OpenAPI.TOKEN = JWT_TOKEN;

// Alternatively, you can use a dynamic token provider for automatic token refresh:
// OpenAPI.TOKEN = async () => {
//     // Get a fresh token from your authentication system
//     return "YOUR_FRESH_JWT_TOKEN";
// };
