import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const ctisLogo = 'https://cdn.myportfolio.com/9ad4e767-db52-4662-a159-aed2a549175d/82b49439-5829-4ab9-ab5b-290bcfd4fff5_rw_3840.png?h=3ec36cb1fab6bfbbc87a2a606b808d03';

interface LoginScreenProps {
  onLogin: (role: 'PI' | 'Reviewer' | 'Admin' | 'Sponsor') => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setErrors({ email: '', password: '' });
    onLogin('PI');
  };

  return (
    <div className="min-h-screen bg-[#6B0D0D] flex items-center justify-center relative overflow-hidden p-4">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <img src={ctisLogo} alt="CTIS Logo" className="h-16 md:h-20 mx-auto mb-4" />
          <h1 className="text-lg md:text-2xl text-[#6B0D0D] mb-2">Clinical Trial Protocol Review System</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            error={errors.email}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            error={errors.password}
            required
          />
          <Button fullWidth variant="primary" type="submit">
            Sign In
          </Button>
          <a href="#" className="block text-center mt-4 text-[#E8930A] text-sm hover:underline">
            Forgot password?
          </a>
        </form>
        <p className="text-center text-xs text-[#6B6B6B] mt-6">
          Authorized users only. All activity is logged and monitored.
        </p>
      </div>
    </div>
  );
}