'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '../../../lib/axiosClient';
import Cookies from 'js-cookie';

export default function Login() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);

    try {
      const response = await api.post('/api/login', {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        Cookies.set('auth_token', response.data.data.token, {
          secure: true,
          sameSite: 'lax',
          expires: 1, // days
        });
        router.push('/');
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Something went wrong';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-base-100">
        <h1 className="text-4xl font-bold text-center text-primary mb-6">Login</h1>

        {serverError && (
          <p className="text-error text-center mb-4">{serverError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email',
                },
              })}
            />
            {errors.email && (
              <span className="text-error text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            {errors.password && (
              <span className="text-error text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? 'btn-disabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
