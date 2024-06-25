import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SleepForm from '../../src/forms/SleepForm';

describe('SleepForm Component', () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    render(<SleepForm onSubmit={onSubmitMock} />);
  });

  it('should render form elements correctly', () => {
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('should display error messages when form inputs are invalid', async () => {
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    });
  });

  it('should call onSubmit prop with correct data when form is valid', async () => {
    const nameInput = screen.getByLabelText(/Name/i);
    const genderSelect = screen.getByLabelText(/Gender/i);
    const durationInput = screen.getByLabelText(/Duration/i);
    const dateInput = screen.getByLabelText(/Date/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(genderSelect, { target: { value: 'Male' } });
    fireEvent.change(durationInput, { target: { value: '8' } });
    fireEvent.change(dateInput, { target: { value: '2024-06-22' } });

    fireEvent.submit(screen.getByRole('form'));

    expect(onSubmitMock).toHaveBeenCalledWith({
      name: 'John Doe',
      gender: 'Male',
      duration: 8,
      date: '2024-06-22',
    });
  });
});
