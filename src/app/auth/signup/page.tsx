'use client';

import { useState } from 'react';
import { Input, Button, Card, CardBody, Form } from '@nextui-org/react';
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
    if (form.password !== form.passwordConfirm) {
      toast.error('Passwords do not match!');
      return;
    }
    signupMutation.mutate(form);
  };

  return (
    <main className="px-12 py-8 flex flex-col items-center gap-4 w-[800px] max-w-full mx-auto">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardBody className="p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Sign Up</h1>
          <p className="text-gray-600 text-center mb-6">Create a new account</p>
          <Form
            validationBehavior="native"
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              minLength={3}
              maxLength={50}
              isRequired
            />
            <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} isRequired />
            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              maxLength={50}
              isRequired
            />
            <Input
              label="Confirm Password"
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={handleChange}
              minLength={8}
              maxLength={50}
              isRequired
            />
            <Input
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              minLength={3}
              maxLength={50}
              isRequired
            />
            <Input
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              minLength={3}
              maxLength={50}
              isRequired
            />
            <Input
              label="Phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              minLength={10}
              maxLength={15}
              isRequired
            />
            <Button
              type="submit"
              color="primary"
              isDisabled={
                !form.username || !form.email || !form.password || !form.firstName || !form.lastName || !form.phone
              }
              className="self-center"
            >
              Sign Up
            </Button>
          </Form>
        </CardBody>
      </Card>
    </main>
  );
}
