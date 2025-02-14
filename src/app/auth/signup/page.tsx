'use client';

import { useState } from 'react';
import { Input, Button, Card, CardBody } from '@nextui-org/react';
import { useMutation } from 'react-query';
import { signup } from '@/service/auth';
import { toast } from 'sonner';

/**
 * This component renders the Sign-Up page, allowing users to create a new account.
 * It includes form fields for user credentials and personal details, and handles authentication
 * using a React Query mutation.
 *
 * @component
 * @returns {JSX.Element} The Sign-Up page layout.
 */
export default function SignUpPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success('Account created successfully!');
    },
    onError: () => {
      toast.error('There was an error creating your account. Please try again.');
    },
  });

  const handleSubmit = () => {
    signupMutation.mutate(form);
  };

  return (
    <main className="px-12 py-8 flex flex-col items-center gap-4 w-[800px] max-w-full mx-auto">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardBody className="p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Sign Up</h1>
          <p className="text-gray-600 text-center mb-6">Create a new account</p>
          <form className="flex flex-col gap-4">
            <Input label="Username" name="username" value={form.username} onChange={handleChange} required />
            <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={handleChange}
              required
            />
            <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
            <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
            <Input label="Phone" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
            <Button
              color="primary"
              isDisabled={
                !form.username || !form.email || !form.password || !form.firstName || !form.lastName || !form.phone
              }
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
