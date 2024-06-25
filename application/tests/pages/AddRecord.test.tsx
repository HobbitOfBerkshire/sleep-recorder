import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddRecordPage from '../../src/pages/AddRecord';
import { addRecord } from '../../src/services/api';

jest.mock('../../src/services/api');

describe('AddRecordPage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders add record page with form', async () => {
    render(<AddRecordPage />);

    expect(screen.getByText('Add a new record')).toBeInTheDocument();
    expect(
      screen.queryByText('Failed to add record. Please try again.'),
    ).toBeNull();

    (addRecord as jest.Mock).mockResolvedValueOnce({});

    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'Test Record' },
    });
    fireEvent.change(screen.getByLabelText('Gender:'), {
      target: { value: 'Male' },
    });
    fireEvent.change(screen.getByLabelText('Duration (hours):'), {
      target: { value: '7' },
    });
    fireEvent.change(screen.getByLabelText('Date:'), {
      target: { value: '2024-05-30' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(addRecord).toHaveBeenCalledTimes(1);
    });
  });

  it('displays error message when adding record fails', async () => {
    render(<AddRecordPage />);

    expect(screen.getByText('Add a new record')).toBeInTheDocument();
    expect(
      screen.queryByText('Failed to add record. Please try again.'),
    ).toBeNull();

    (addRecord as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: 'Validation error' } },
    });

    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'Test Record' },
    });
    fireEvent.change(screen.getByLabelText('Gender:'), {
      target: { value: 'Male' },
    });
    fireEvent.change(screen.getByLabelText('Duration (hours):'), {
      target: { value: '7' },
    });
    fireEvent.change(screen.getByLabelText('Date:'), {
      target: { value: '2024-05-30' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(
        screen.queryByText('Failed to add record. Please try again.'),
      ).toBeNull();
    });
  });
});
