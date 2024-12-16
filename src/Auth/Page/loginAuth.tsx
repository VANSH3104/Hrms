import { DUMMY_USERS } from '../../dummyData/data';
import { loginFailure, loginSuccess } from '../../features/authSlice';
import { RootState } from '@/store/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Find the user in the dummy data
    const user = DUMMY_USERS.find((user) => user.profile.email === email && user.profile.password === password);

    if (user) {
      //@ts-expect-error
      dispatch(loginSuccess(user));
      navigate("/dashboard")
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {isAuthenticated && <p>Welcome! You are logged in as {email}.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

