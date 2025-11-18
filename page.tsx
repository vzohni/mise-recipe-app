import { Suspense } from 'react';
import { LoginMessages } from './login-messages';

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/login"
        method="post"
      >
        <label className="text-md" htmlFor="email">Email</label>
        <input className="rounded-md px-4 py-2 bg-inherit border mb-6" name="email" placeholder="you@example.com" required />
        <label className="text-md" htmlFor="password">Password</label>
        <input className="rounded-md px-4 py-2 bg-inherit border mb-6" type="password" name="password" placeholder="••••••••" required />
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">Sign In</button>
        <Suspense fallback={null}>
          <LoginMessages />
        </Suspense>
      </form>
    </div>
  );
}
