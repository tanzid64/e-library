import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface AuthLaoyoutProps {
  children: ReactNode;
}

const AuthLaoyout: FC<AuthLaoyoutProps> = ({children}) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/icons/logo.svg" alt="Logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">eLibrary</h1>
          </div>
          <div className="">
            {children}
          </div>
        </div>
      </section>

      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="Auth Illustration"
          width={1000}
          height={1000}
          className="object-cover size-full"
        />
      </section>
    </main>
  );
};

export default AuthLaoyout;
