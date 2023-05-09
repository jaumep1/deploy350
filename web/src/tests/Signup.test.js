/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import SignupLayout from '../components/Signup/SignupLayout';
import postSignup from '../api/signup';
import { rootURL, serverPort } from '../utils/utils';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('axios');

test('renders Signup', async () => {
  render(
    <BrowserRouter><SignupLayout /></BrowserRouter>,
  );
  const linkElement = screen.getByText(/Pick.it Signup/);
  expect(linkElement).toBeInTheDocument();
});

describe('Signup failure', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Return 401 when input is null', async () => {
    const expectedResponse = {
      error: 'Must provide username and password',
      status: 401,
    };

    axios.post = jest.fn().mockResolvedValue(expectedResponse);

    const response = await postSignup(null, null, null, null);

    expect(response).toEqual(expectedResponse);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${rootURL}:${serverPort}/signup`,
      {
        username: null, password: null, role: null, name: null,
      },
    );
  });

  test('Return 409 when username already exists', async () => {
    const expectedResponse = {
      error: 'Username already exists',
      status: 409,
    };

    axios.post = jest.fn().mockResolvedValue(expectedResponse);

    const response = await postSignup('admin', 'admin', 'nurse', 'Some Name');

    expect(response).toEqual(expectedResponse);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${rootURL}:${serverPort}/signup`,
      {
        username: 'admin', password: 'admin', role: 'nurse', name: 'Some Name',
      },
    );
  });
});

describe('Signup success', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Valid new user added and successful update', async () => {
    const randomUser = `user_test${Math.round(Math.random() * 1000)}`;
    const expectedResponse = {
      error: 'Username already exists',
      status: 201,
    };

    axios.post = jest.fn().mockResolvedValue(expectedResponse);
    const response = await postSignup(randomUser, randomUser, 'nurse', 'Some Name');

    expect(response.status).toEqual(201);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${rootURL}:${serverPort}/signup`,
      {
        username: randomUser, password: randomUser, role: 'nurse', name: 'Some Name',
      },
    );
  });
});

describe('UI Tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('calls handleUsername when the username input changes', () => {
    const handleUsername = jest.fn();
    render(
      <BrowserRouter><SignupLayout handleUsername={handleUsername} handlePassword={() => {}} /></BrowserRouter>,
    );

    const element = screen.getByTestId('usernameinput');
    fireEvent.change(element, { target: { value: 'testuser' } });

    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
  });

  it('calls handlePassword when the password input changes', () => {
    const handlePassword = jest.fn();
    render(
      <BrowserRouter><SignupLayout handleUsername={() => {}} handlePassword={handlePassword} /></BrowserRouter>,
    );
    const element = screen.getByTestId('passwordinput');
    fireEvent.change(element, { target: { value: 'testpassword' } });

    expect(screen.getByDisplayValue('testpassword')).toBeInTheDocument();
  });

  it('calls handleRole when the role input changes', () => {
    const handleRole = jest.fn();
    render(
      <BrowserRouter><SignupLayout handleRole={handleRole} /></BrowserRouter>,
    );
    const element = screen.getByTestId('roleinput');
    fireEvent.change(element, { target: { value: 'testrole' } });

    expect(screen.getByDisplayValue('testrole')).toBeInTheDocument();
  });

  it('calls handleName when the Name input changes', () => {
    const handleName = jest.fn();
    render(
      <BrowserRouter><SignupLayout handleName={handleName} /></BrowserRouter>,
    );
    const element = screen.getByTestId('nameinput');
    fireEvent.change(element, { target: { value: 'testName' } });

    expect(screen.getByDisplayValue('testName')).toBeInTheDocument();
  });
});

describe('Submit', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Submit with invalid role', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const handlePassword = jest.fn();
    render(
      <BrowserRouter><SignupLayout handleUsername={() => {}} handlePassword={handlePassword} /></BrowserRouter>,
    );
    expect(alertMock).toHaveBeenCalledTimes(0);

    const username = screen.getByTestId('usernameinput');
    fireEvent.change(username, { target: { value: 'testuser' } });

    const password = screen.getByTestId('passwordinput');
    fireEvent.change(password, { target: { value: 'testpassword' } });

    const role = screen.getByTestId('roleinput');
    fireEvent.change(role, { target: { value: 'testrole' } });

    const name = screen.getByTestId('nameinput');
    fireEvent.change(name, { target: { value: 'testname' } });

    const button = screen.getByText('Signup');
    fireEvent.click(button);

    expect(screen.getByText('Pick.it Signup')).toBeInTheDocument();
    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  it('Submit success', () => {
    const handlePassword = jest.fn();
    render(
      <BrowserRouter><SignupLayout handleUsername={() => {}} handlePassword={handlePassword} /></BrowserRouter>,
    );

    const username = screen.getByTestId('usernameinput');
    fireEvent.change(username, { target: { value: 'admin' } });

    const password = screen.getByTestId('passwordinput');
    fireEvent.change(password, { target: { value: 'testpassword' } });

    const role = screen.getByTestId('roleinput');
    fireEvent.change(role, { target: { value: 'nurse' } });

    const name = screen.getByTestId('nameinput');
    fireEvent.change(name, { target: { value: 'testname' } });

    const button = screen.getByText('Signup');
    fireEvent.click(button);

    const element = screen.queryByText(/Login/);
    expect(element).toBeNull();
  });
});
