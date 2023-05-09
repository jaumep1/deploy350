/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

// jest.mock('../api/login');

/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import LoginLayout from '../components/Login/LoginLayout';
import { postLogin, getUserSettings } from '../api/login';
import { rootURL, serverPort } from '../utils/utils';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('axios');

test('renders Login', async () => {
  render(
    <BrowserRouter><LoginLayout /></BrowserRouter>,
  );
  const linkElement = screen.getByText(/Pick.it Login/);
  expect(linkElement).toBeInTheDocument();
});

describe('Login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('return correct response on login', async () => {
    const expectedResponse = {
      data: {
        userid: '0',
        username: 'admin',
        password: 'admin',
        role: 'nurse',
      },
      status: 200,
    };

    axios.post = jest.fn().mockResolvedValue(expectedResponse);

    const response = await postLogin('admin', 'admin');

    expect(response).toEqual(expectedResponse);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${rootURL}:${serverPort}/login`,
      { username: 'admin', password: 'admin' },
    );
  });
  test('returns error on invalid username/password combination', async () => {
    const expectedError = { err: undefined };
    axios.post = jest.fn().mockRejectedValue(expectedError);

    const response = await postLogin('invalid_username', 'invalid_password');

    expect(response).toEqual(expectedError);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${rootURL}:${serverPort}/login`,
      { username: 'invalid_username', password: 'invalid_password' },
    );
  });
});

describe('getUserSettings', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('returns user settings for valid userid', async () => {
    const expectedResponse = {
      data: {
        userid: '0',
        name: 'John Doe',
        photo: null,
        contactEmail: 'alternative@gmail.com',
        phoneNumber: 1231231234,
        notificationOn: true,
        doNotDisturbBegin: 1800,
        doNotDisturbEnd: 2200,
        defaultDeliveryLocation: 'Room 101',
      },
      status: 200,
    };

    axios.get = jest.fn().mockResolvedValue(expectedResponse);

    const response = await getUserSettings('0');

    expect(response).toEqual(expectedResponse);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${rootURL}:${serverPort}/user/0`);
  });

  test('returns err for invalid userid', async () => {
    const expectedError = new Error('Request failed with status code 404');
    axios.get = jest.fn().mockRejectedValue(expectedError);

    const response = await getUserSettings('invalid-userid');

    expect(response).toEqual({ err: 'Request failed with status code 404' });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${rootURL}:${serverPort}/user/invalid-userid`);
  });

  it('calls handleUsername when the username input changes', () => {
    const handleUsername = jest.fn();
    render(
      <BrowserRouter>
        <LoginLayout handleUsername={handleUsername} handlePassword={() => {}} />
      </BrowserRouter>,
    );

    const element = screen.getByTestId('usernameinput');
    fireEvent.change(element, { target: { value: 'testuser' } });

    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
  });

  it('calls handlePassword when the password input changes', () => {
    const handlePassword = jest.fn();
    render(
      <BrowserRouter>
        <LoginLayout handleUsername={() => {}} handlePassword={handlePassword} />
      </BrowserRouter>,
    );
    const element = screen.getByTestId('passwordinput');
    fireEvent.change(element, { target: { value: 'testpassword' } });

    expect(screen.getByDisplayValue('testpassword')).toBeInTheDocument();
  });
});

describe('branch tests', () => {
  jest.mock('../api/login', () => ({
    postLogin: jest.fn(),
  }));
  test('handles successful login', async () => {
    render(<BrowserRouter><LoginLayout /></BrowserRouter>);
    const usernameInput = screen.getByTestId('usernameinput');
    const passwordInput = screen.getByTestId('passwordinput');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    const element = screen.queryByText(/Item Search/);
    expect(element).toBeNull();
  });

  test('handles unsuccessful login (status 401)', async () => {
    axios.post = jest.fn().mockRejectedValue({ response: { status: 401 } });

    global.alert = jest.fn();

    render(<BrowserRouter><LoginLayout /></BrowserRouter>);
    const passwordInput = screen.getByTestId('passwordinput');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    const element = screen.queryByText(/Item Search/);
    expect(element).toBeNull();
  });
});
