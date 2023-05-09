/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {
  render, fireEvent, screen, act,
} from '@testing-library/react';
import React from 'react';
import ChatboxModal from '../components/tracking_components/modals/ChatboxModal';

import { getOrderChatMessages, postNewChatMessage } from '../api/deliveryApiCalls';

// Mock the getOrderChatMessages API call
jest.mock('../api/deliveryApiCalls', () => ({
  getOrderChatMessages: jest.fn(),
  postNewChatMessage: jest.fn(),
}));

describe('ChatboxModal', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should render correctly', async () => {
    // Set up the mocked response for the getOrderChatMessages API call
    const mockMessages = [
      { sender: 1, message: 'Hello' },
      { sender: 2, message: 'Hi' },
    ];
    getOrderChatMessages.mockResolvedValue(mockMessages);

    // Render the ChatboxModal component
    render(<ChatboxModal show onHide={() => {}} orderNumber={123} user={1} />);

    // Wait for the component to finish loading
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Expect the component to render the messages correctly
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi')).toBeInTheDocument();
  });

  test('should send a new message when the send button is clicked', async () => {
    // Set up the mocked response for the getOrderChatMessages API call
    const mockMessages = [
      { sender: 1, message: 'Hello' },
      { sender: 2, message: 'Hi' },
    ];
    getOrderChatMessages.mockResolvedValue(mockMessages);

    // Render the ChatboxModal component
    render(<ChatboxModal show onHide={() => {}} orderNumber={123} user={1} />);

    // Wait for the component to finish loading
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Mock the postNewChatMessage API call
    postNewChatMessage.mockResolvedValue({});

    // Enter a new message into the input field and click the send button
    fireEvent.change(screen.getByPlaceholderText('Send message to other user.'), { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText('Send'));

    // Expect the postNewChatMessage API call to be called with the correct arguments
    expect(postNewChatMessage).toHaveBeenCalledWith(123, 'Test message', 1);

    // Expect the message to appear in the message list
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});
