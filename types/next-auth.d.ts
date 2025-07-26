import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'admin' | 'vendor' | 'seller';
    };
  }

  interface User {
    role: 'admin' | 'vendor' | 'seller';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'admin' | 'vendor' | 'seller';
  }
}