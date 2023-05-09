/* eslint-disable react/no-children-prop */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import userEvent from '@testing-library/user-event';
import {
  render, screen,
} from '@testing-library/react';
import PopUpModal from '../components/tracking_components/modals/PopUpModal';

describe('PopUpModal component', () => {
  test('renders with the correct title', () => {
    render(<PopUpModal show onHide={() => {}} children={<div />} title="Test Modal" />);
    const title = screen.getByText('Test Modal');
    expect(title).toBeInTheDocument();
  });

  test('renders with the correct children', () => {
    render(<PopUpModal show onHide={() => {}} children={<div>Test Children</div>} title="Test Modal" />);
    const children = screen.getByText('Test Children');
    expect(children).toBeInTheDocument();
  });

  test('does not render when show is false', () => {
    const { container } = render(<PopUpModal show={false} onHide={() => {}} children={<div />} title="Test Modal" />);
    expect(container.firstChild).toBeNull();
  });
});
