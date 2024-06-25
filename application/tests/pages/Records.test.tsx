import { render, screen, waitFor } from '@testing-library/react';
import { fetchRecords } from '../../src/services/api';
import { Record } from '../../src/types';
import RecordsPage from '../../src/pages/Records';

jest.mock('../../src/services/api');

describe('RecordsPage Component', () => {
  it('renders records page with data', async () => {
    const mockRecords: Record[] = [
      {
        id: 1,
        name: 'Record 1',
        duration: 5,
        gender: 'Male',
        date: '2023-04-01',
      },
      {
        id: 2,
        name: 'Record 2',
        duration: 7,
        gender: 'Female',
        date: '2023-04-01',
      },
    ];

    (fetchRecords as jest.Mock).mockResolvedValue(mockRecords);

    render(<RecordsPage />);

    await waitFor(() => {
      expect(screen.getByText('View all records')).toBeInTheDocument();
      expect(
        screen.queryByText('Failed to fetch records. Please try again later.'),
      ).toBeNull();
      expect(screen.getByText('Record 1')).toBeInTheDocument();
      expect(screen.getByText('Record 2')).toBeInTheDocument();
    });
  });

  it('displays error message when API fetch fails', async () => {
    const errorMessage = 'Failed to fetch records. Please try again later.';

    (fetchRecords as jest.Mock).mockRejectedValue(
      new Error('API request failed'),
    );

    render(<RecordsPage />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
