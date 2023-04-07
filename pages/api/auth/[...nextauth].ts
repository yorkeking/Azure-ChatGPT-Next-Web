import NextAuth, { NextAuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [],
}

if (process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET && process.env.AZURE_AD_TENANT_ID) {
  authOptions.providers.push(AzureADProvider({
    clientId: process.env.AZURE_AD_CLIENT_ID,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    tenantId: process.env.AZURE_AD_TENANT_ID,
  }));
}

if (process.env.BASIC_AUTH_USERNAME && process.env.BASIC_AUTH_PASSWOED) {
  authOptions.providers.push(CredentialsProvider({
    name: "anonymous",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      if (credentials?.username === process.env.BASIC_AUTH_USERNAME && credentials?.password === process.env.BASIC_AUTH_PASSWOED) {
        return { id: "1", name: "Basic Auth", email: "anonymous@lizhe.org" };
      }
      
      return null;
    }
  }));
}

export default NextAuth(authOptions)
