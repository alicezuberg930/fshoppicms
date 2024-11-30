// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { InvalidEmailPasswordError, InactiveAccountError } from "./utils/error_handling"
// import { sendRequest } from "@/library/api"
// import { IUser } from "@/types/next-auth"
// export const { handlers, signIn, signOut, auth } = NextAuth({
//     providers: [
//         Credentials({
//             credentials: {
//                 email: {},
//                 password: {}
//             },
//             authorize: async (credentials) => {
//                 const response = await sendRequest<IBackendRes<ILogin>>({
//                     method: "POST",
//                     url: process.env.API_URL + "/auth/login",
//                     body: {
//                         username: credentials.email,
//                         password: credentials.password
//                     }
//                 })
//                 if (response.statusCode == 201) {
//                     return {
//                         _id: response.data?.user._id,
//                         name: response.data?.user.name,
//                         email: response.data?.user.email,
//                         access_token: response.data?.access_token,
//                     }
//                 } else if (response.statusCode == 401) {
//                     throw new InvalidEmailPasswordError()
//                 } else if (response.statusCode == 400) {
//                     throw new InactiveAccountError()
//                 } else {
//                     throw new Error("Internal server error")
//                 }
//             }
//         }),
//     ],
//     pages: {
//         signIn: "/cms/login"
//     },
//     callbacks: {
//         jwt({ token, user }) {
//             if (user) {
//                 token.user = (user as IUser)
//             }
//             return token
//         },
//         session({ session, token }) {
//             (session.user as IUser) = token.user
//             return session
//         },
//         authorized: async ({ auth }) => {
//             return !!auth
//         },
//     }
// })