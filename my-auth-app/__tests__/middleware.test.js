import { NextResponse } from 'next/server';
import { middleware } from '../middleware';

jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn(),
    next: jest.fn(),
  },
}));

describe('Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect unauthenticated users to login page when accessing dashboard', () => {
    const request = {
      nextUrl: { pathname: '/dashboard' },
      cookies: { get: jest.fn().mockReturnValue(undefined) },
    };

    middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(expect.stringContaining('/login'));
  });

  it('should allow authenticated users to access dashboard', () => {
    const request = {
      nextUrl: { pathname: '/dashboard' },
      cookies: { get: jest.fn().mockReturnValue({ value: 'valid-token' }) },
    };

    middleware(request);

    expect(NextResponse.next).toHaveBeenCalled();
  });

  it('should allow access to non-protected routes', () => {
    const request = {
      nextUrl: { pathname: '/public-route' },
      cookies: { get: jest.fn() },
    };

    middleware(request);

    expect(NextResponse.next).toHaveBeenCalled();
  });
});
