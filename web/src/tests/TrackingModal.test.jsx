/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {
  render, screen,
} from '@testing-library/react';
import TrackingModal from '../components/tracking_components/modals/TrackingModal';

describe('TrackingModal', () => {
  it('renders the component with all the props', () => {
    const props = {
      show: true,
      onHide: jest.fn(),
      productNumber: '21228080808290',
      status: 'Order Received',
      statusDescription: "We're waiting on your order",
    };
    render(<TrackingModal {...props} />);
    const titleElement = screen.getByText(`Order #${props.productNumber} Tracking`);
    expect(titleElement).toBeInTheDocument();
    const orderStatusElement = screen.getByText(`Order Status: ${props.status}`);
    expect(orderStatusElement).toBeInTheDocument();
    const orderStatusDescriptionElement = screen.getByText(props.statusDescription);
    expect(orderStatusDescriptionElement).toBeInTheDocument();
  });
});
