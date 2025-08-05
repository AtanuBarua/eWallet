'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '../../../lib/axiosClient';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function Register() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      transactionPin: '',
      userType: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);

    try {
      const response = await api.post('/api/register', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        transaction_pin: data.transactionPin,
        role: data.userType,
      });

      if (response.status === 201) {
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
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-2xl p-8 bg-base-100 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
          {serverError && (
            <p className="text-error mb-4 text-center">{serverError}</p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Name  */}
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''
                  }`}
                placeholder="Enter your name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <span className="text-error text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email  */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''
                  }`}
                placeholder="Enter your email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Valid email is required',
                  },
                })}
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Phone  */}
            <div>
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Phone number is required',
                  validate: (value) =>
                    value && value.length >= 10
                      ? true
                      : 'Valid phone number is required',
                }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    defaultCountry="BD"
                    international
                    className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''
                      }`}
                  />
                )}
              />
              {errors.phone && (
                <span className="text-error text-sm mt-1">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Password  */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''
                  }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters',
                  },
                })}
              />
              {errors.password && (
                <span className="text-error text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Pin  */}
            <div>
              <label className="label">
                <span className="label-text">Transaction PIN</span>
              </label>
              <input
                type="number"
                placeholder="Enter 4-digit PIN"
                className={`input input-bordered w-full ${errors.transactionPin ? 'input-error' : ''
                  }`}
                {...register('transactionPin', {
                  required: 'Transaction PIN is required',
                  pattern: {
                    value: /^\d{4}$/,
                    message: 'PIN must be 4 digits',
                  },
                })}
              />
              {errors.transactionPin && (
                <span className="text-error text-sm mt-1">
                  {errors.transactionPin.message}
                </span>
              )}
            </div>

            {/* Type  */}
            <div>
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select
                className={`select select-bordered w-full ${errors.userType ? 'select-error' : ''
                  }`}
                {...register('userType', {
                  required: 'User type is required',
                })}
              >
                <option value="">Select User Type</option>
                <option value="1">User</option>
                <option value="2">Agent</option>
              </select>
              {errors.userType && (
                <span className="text-error text-sm mt-1">
                  {errors.userType.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? 'btn-disabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
