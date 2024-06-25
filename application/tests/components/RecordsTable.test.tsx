import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordsTable from '../../src/components/RecordsTable';

jest.mock('echarts', () => ({
  init: jest.fn(),
  dispose: jest.fn(),
}));

describe('RecordsTable Component', () => {
  it('renders table with grouped records', () => {
    const records = [
      {
        id: 1,
        name: 'John Doe',
        gender: 'Male',
        duration: 6,
        date: '2023-04-01',
      },
      {
        id: 2,
        name: 'Jane Doe',
        gender: 'Female',
        duration: 8,
        date: '2023-04-01',
      },
      {
        id: 3,
        name: 'John Doe',
        gender: 'Male',
        duration: 7,
        date: '2023-04-01',
      },
    ];

    render(<RecordsTable records={records} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    expect(document.getElementById('echarts-container')).toBeInTheDocument();
  });

  it('handles row click and renders chart', async () => {
    const records = [
      {
        id: 1,
        name: 'John Doe',
        gender: 'Male',
        duration: 6,
        date: '2023-04-01',
      },
      {
        id: 2,
        name: 'Jane Doe',
        gender: 'Female',
        duration: 8,
        date: '2023-04-01',
      },
      {
        id: 3,
        name: 'John Doe',
        gender: 'Male',
        duration: 7,
        date: '2023-04-01',
      },
    ];

    render(<RecordsTable records={records} />);

    const echartsMock = jest.requireMock('echarts');
    echartsMock.init.mockImplementationOnce(() => ({
      setOption: jest.fn(),
    }));

    fireEvent.click(screen.getByText('2'));

    expect(echartsMock.init).toHaveBeenCalledTimes(1);
    expect(echartsMock.init.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('disposes chart when row is clicked again', async () => {
    const records = [
      {
        id: 1,
        name: 'John Doe',
        gender: 'Male',
        duration: 6,
        date: '2023-04-01',
      },
    ];

    render(<RecordsTable records={records} />);

    const echartsMock = jest.requireMock('echarts');
    echartsMock.init.mockImplementationOnce(() => ({
      setOption: jest.fn(),
    }));

    fireEvent.click(screen.getByText('1'));

    expect(echartsMock.init).toHaveBeenCalled();

    fireEvent.click(screen.getByText('1'));

    expect(echartsMock.dispose).toHaveBeenCalled();
  });
});
