import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from '../app/login/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe('LoginPage', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({ push: jest.fn() });
    global.fetch.mockClear();
  });

  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Login successful' }),
    });

    const routerPush = jest.fn();
    useRouter.mockReturnValue({ push: routerPush });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/login', expect.any(Object));
      expect(routerPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles login failure', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Invalid credentials' }),
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
