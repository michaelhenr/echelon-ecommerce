// Unit tests for Login component
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import Login from '../pages/Login';
import { AuthProvider } from '../contexts/AuthContext';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: { from: { pathname: '/' } }
  })
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Mock axios
const mockAxios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  defaults: {
    headers: {
      common: {}
    }
  }
};
jest.mock('axios', () => mockAxios);

const renderWithProviders = (component) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            {component}
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders login form correctly', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('shows demo accounts', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText('Demo Accounts')).toBeInTheDocument();
    expect(screen.getByText('Admin: admin@echelon.com / admin123')).toBeInTheDocument();
    expect(screen.getByText('Brand Owner: brand@echelon.com / brand123')).toBeInTheDocument();
    expect(screen.getByText('Advertiser: advertiser@echelon.com / ad123')).toBeInTheDocument();
    expect(screen.getByText('Client: client@echelon.com / client123')).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('toggles password visibility', () => {
    renderWithProviders(<Login />);
    
    const passwordInput = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button', { name: /toggle password/i });
    
    expect(passwordInput.type).toBe('password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('shows loading state during login', async () => {
    // Mock successful login response
    mockAxios.post.mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          user: { id: '1', email: 'test@example.com', role: 'client' },
          token: 'mock-token'
        }
      }
    });

    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Signing In...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('handles successful login', async () => {
    // Mock successful login response
    mockAxios.post.mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          user: { id: '1', email: 'test@example.com', role: 'client' },
          token: 'mock-token'
        }
      }
    });

    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        {
          email: 'test@example.com',
          password: 'password123'
        }
      );
    });
  });

  it('handles login error', async () => {
    // Mock login error response
    mockAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          error: 'Invalid credentials'
        }
      }
    });

    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('validates required fields', async () => {
    renderWithProviders(<Login />);
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);
    
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('has links to register and forgot password', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign up here')).toBeInTheDocument();
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
  });
});