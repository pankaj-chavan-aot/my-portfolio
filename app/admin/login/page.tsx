// 'use client';

// import { useState } from 'react';
// import { login } from '@/data/auth-data';
// import './login.css';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     if (!username.trim() || !password.trim()) {
//       setError('Please enter both username and password');
//       setIsLoading(false);
//       return;
//     }

//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const isSuccess = login(username, password);
    
//     if (isSuccess) {
//       window.location.href = '/admin';
//     } else {
//       setError('Invalid username or password');
//     }
    
//     setIsLoading(false);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h1>🔐 Admin Login</h1>
//           <p>Access your portfolio dashboard</p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">
//           {error && (
//             <div className="error-message">
//               ❌ {error}
//             </div>
//           )}

//           <div className="form-group">
//             <label htmlFor="username">👤 Username</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">🔒 Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <button 
//             type="submit" 
//             className="login-btn"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <span className="loading-spinner"></span>
//                 Authenticating...
//               </>
//             ) : (
//               '🚀 Login to Dashboard'
//             )}
//           </button>
//         </form>

//         <div className="login-footer">
//           <p><strong>Default Credentials:</strong></p>
//           <p>Username: <code>admin</code></p>
//           <p>Password: <code>admin123</code></p>
//           <p className="security-note">
//             💡 Change these credentials in production
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/validation/schemas';
import { login } from '@/data/auth-data';
import Input from '@/components/UI/Form/Input';
import './login.css';

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      const isSuccess = login(data.username, data.password);
      
      if (!isSuccess) {
        throw new Error('Invalid username or password');
      }
      
      window.location.href = '/admin';
    } catch (error) {
      console.error('Login error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong');
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 Admin Login</h1>
          <p>Access your portfolio dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
          {submitError && (
            <div className="error-message global-error">
              ❌ {submitError}
            </div>
          )}

          <Input
            label="👤 Username"
            name="username"
            type="text"
            placeholder="Enter your username"
            required
            register={register}
            error={errors.username}
            disabled={isSubmitting}
          />

          <Input
            label="🔒 Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            register={register}
            error={errors.password}
            disabled={isSubmitting}
          />

          <button 
            type="submit" 
            className="login-btn"
            disabled={isSubmitting || !isValid || !isDirty}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Authenticating...
              </>
            ) : (
              '🚀 Login to Dashboard'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p><strong>Default Credentials:</strong></p>
          <p>Username: <code>admin</code></p>
          <p>Password: <code>admin123</code></p>
          <p className="security-note">
            💡 Change these credentials in production
          </p>
        </div>
      </div>
    </div>
  );
}