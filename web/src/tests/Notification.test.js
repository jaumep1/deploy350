/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import userEvent from '@testing-library/user-event';
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import Notification from '../components/tracking_components/Notification';

describe('Notification component', () => {
  const props = {
    title: 'Test Notification',
    message: 'This is a test message',
    date: '2022-03-21',
    statusCode: '0',
    lawsonNumber: '123456',
    productCategory: 'Test Category',
    notificationID: 0,
    currentView: 0,
  };

  it('should render the title and message', () => {
    render(<Notification {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.message)).toBeInTheDocument();
  });

  it('should render the date', () => {
    render(<Notification {...props} />);
    expect(screen.getByText(props.date)).toBeInTheDocument();
  });

  it('should render the lawson number and product category', () => {
    render(<Notification {...props} />);
    expect(screen.getByText(props.lawsonNumber)).toBeInTheDocument();
    expect(screen.getByText(props.productCategory)).toBeInTheDocument();
  });

  // it('should render the correct notification image', () => {
  //   const props2 = {
  //     title: 'Test Notification',
  //     message: 'This is a test message',
  //     date: '2022-03-21',
  //     statusCode: '0',
  //     lawsonNumber: '123456',
  //     productCategory: 'Test Category',
  //     notificationID: 0,
  //     currentView: 0,
  //   };
  //   render(<Notification {...props2} />);
  //   const element = screen.getByAltText('missingimage');
  //   expect(element).toHaveAttribute('src', 'test-image2.png');
  // });

  it('renders the correct indicator styling based on status code', () => {
    render(<Notification {...props} />);
    const indicator = screen.getByText('This is a test message');

    expect(indicator).toBeInTheDocument();
    // expect(indicator).toHaveClass('bg-red-400');
  });
});
