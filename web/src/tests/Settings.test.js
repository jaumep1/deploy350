/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
// jest.mock('../api/login');

import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import SettingsCard from '../components/Settings/SettingsCard';
import Settings from '../components/Settings';
import { postLogin, getUserSettings } from '../api/login';
import { rootURL, serverPort } from '../utils/utils';

jest.mock('axios');

test('renders Settings', async () => {
  render(<BrowserRouter><Settings /></BrowserRouter>);
  const linkElement = screen.getByText(/Settings/);
  expect(linkElement).toBeInTheDocument();
});

describe('Settings', () => {
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
});

describe('Settings card tests', () => {
  test('renders SettingsCard', () => {
    render(
      <BrowserRouter>
        {' '}
        <SettingsCard
          title="Personal Information"
          items={[{ title: 'Contact Email', type: 'textbox', attr: 'contactEmail' },
            { title: 'Default Delivery Location', type: 'textbox', attr: 'defaultDeliveryLocation' },
            { title: 'Contact Number', type: 'textbox', attr: 'phoneNumber' },
            { title: 'Default Delivery Room', type: 'textbox', attr: 'defaultDeliveryRoom' }]}
        />
      </BrowserRouter>,
    );
    const linkElement = screen.getByText(/Personal Information/);
    expect(linkElement).toBeInTheDocument();
    const button = screen.getByTestId('settingscardbutton');
    fireEvent.click(button);
    const save = screen.getByText(/Save/);
    expect(save).toBeInTheDocument();
    const payloadButton = screen.getByTestId('payloadbuttons');
    fireEvent.click(payloadButton);
    const payloadSave = screen.getByText(/Save/);
    expect(payloadSave).toBeInTheDocument();
  });
});
