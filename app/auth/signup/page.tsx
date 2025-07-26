import { SignUpForm } from '@/components/auth/signup-form';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Leaf className="h-10 w-10 text-green-600" />
            <span className="font-bold text-2xl text-gray-900">FreshMarket</span>
          </Link>
        </div>
        
        <SignUpForm />
        
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-medium text-green-600 hover:text-green-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}