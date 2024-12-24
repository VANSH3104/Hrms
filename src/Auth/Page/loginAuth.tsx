import { DUMMY_USERS } from '../../dummyData/data';
import { loginFailure, loginSuccess } from '../../features/authSlice';
import { RootState } from '@/store/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const User = useSelector((state: RootState)=>state.user.users)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Find the user in the dummy data
    const user = User.find((user) => user.profile.email === email && user.profile.password === password);
    const userId = user?.id

    if (user) {
      //@ts-expect-error
      dispatch(loginSuccess(user));
      navigate(`/dashboard/${userId }`)
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-pink-300 to-pink-500 backdrop-blur-sm">
  <Card className="rounded-lg w-[360px] shadow-lg bg-white">
    <CardHeader className="font-sans text-center">
      <CardTitle className="text-3xl font-bold text-gray-800">Welcome Back</CardTitle>
      <CardDescription className="text-sm text-gray-600 mt-2">
        Please enter your details to continue
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <Button
            size="lg"
            type="submit"
            className="w-full bg-indigo-600 text-white hover:bg-blue-700 transition-all rounded-lg"
          >
            Login
          </Button>
        </div>
      </form>
      <CardFooter className="mt-4 ite">
        {isAuthenticated && (
          <p className="text-sm items-center text-green-600">Welcome! You are logged in as {email}.</p>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </CardFooter>
    </CardContent>
  </Card>
</div>
  );
};

