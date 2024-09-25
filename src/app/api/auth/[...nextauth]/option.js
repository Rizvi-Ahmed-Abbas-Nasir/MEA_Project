import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import executeQuery from '../../../lib/db';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          const query = 'SELECT * FROM members WHERE email = ?;';
          const values = [credentials.email];
          const rows = await executeQuery({ query, values });

          if (rows.length > 0) {
            const user = rows[0];
            const isValidPassword = await bcrypt.compare(credentials.password, user.password);
            if (isValidPassword) {
              return {
                id: user.id,
                name: user.fullName,
                email: user.email,
                image: user.image,
                contactNumber: user.contactNumber, 
                designation: user.designation,
                role: user.Role
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Error authorizing user:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          contactNumber: token.contactNumber,
          designation: token.designation,
          role: token.role
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.contactNumber = user.contactNumber;
        token.designation = user.designation;
        token.role = user.role;
      } 
      return token;
    }
  }
};

export default (req, res) => NextAuth(req, res, authOptions);
