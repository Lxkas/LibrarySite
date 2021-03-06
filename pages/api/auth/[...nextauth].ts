import { withSentry } from "@sentry/nextjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "your@email.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, _req) {
				// console.log("AUTH CALL", credentials, req);

				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				const res = await fetch(
					"http://localhost:3000/api/check_user",
					{
						method: "POST",
						body: JSON.stringify(credentials),
						headers: { "Content-Type": "application/json" },
					}
				);

				const result_response = await res.json();
				// console.log("Success login", result_response);

				// If no error and we have user data, return it
				if (res.ok && !result_response.error) {
					return {
						id: result_response.UserID,
						email: result_response.Email,
						name:
							result_response.FirstName +
							" " +
							result_response.LastName,
					};
				}

				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
});

export default withSentry(handler);
