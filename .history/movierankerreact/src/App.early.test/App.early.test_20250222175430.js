import React from 'react'
import App from '../App';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

describe('App() App method', () => {
  // Mocking fetch
  global.fetch = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  describe('Happy Paths', () => {
    it('should successfully log in and redirect to /movies when valid credentials are provided', async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        json: async () => ({ token: 'mockToken' }),
      };
      fetch.mockResolvedValueOnce(mockResponse);

      // Act
      render(<App />);
      // Simulate the login process
      await screen.findByText('Log in');

      // Assert
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/auth/login', expect.any(Object));
      expect(localStorage.setItem).toHaveBeenCalledWith('jwt', 'mockToken');
      expect(window.location.href).toBe('/movies');
    });

    it('should display a success message when account is created', async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        json: async () => ({ token: 'mockToken' }),
      };
      fetch.mockResolvedValueOnce(mockResponse);

      // Act
      render(<App />);
      // Simulate the account creation process
      await screen.findByText('Account created successfully! Please log in.');

      // Assert
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/auth/signup', expect.any(Object));
      expect(screen.getByText('Log in')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should alert when email or password is empty', async () => {
      // Arrange
      window.alert = jest.fn();

      // Act
      render(<App />);
      // Simulate empty email and password
      await screen.findByText('Log in');

      // Assert
      expect(window.alert).toHaveBeenCalledWith('Login failed!');
    });

    it('should handle network errors gracefully', async () => {
      // Arrange
      const mockError = new Error('Network Error');
      fetch.mockRejectedValueOnce(mockError);
      window.alert = jest.fn();

      // Act
      render(<App />);
      // Simulate the login process
      await screen.findByText('Log in');

      // Assert
      expect(window.alert).toHaveBeenCalledWith('An error occurred. Check the console.');
    });

    it('should alert when no token is received', async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        json: async () => ({}),
      };
      fetch.mockResolvedValueOnce(mockResponse);
      window.alert = jest.fn();

      // Act
      render(<App />);
      // Simulate the login process
      await screen.findByText('Log in');

      // Assert
      expect(window.alert).toHaveBeenCalledWith('Unexpected response. No token received.');
    });
  });
});