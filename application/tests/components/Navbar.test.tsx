import { render, screen } from '@testing-library/react';
import Navbar from '../../src/components/NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar Component', () => {
  it('should render navigation links', () => {
    // Navbar contains Link so needs to be inside a router component, therefor use lightweight one
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getByText('Records')).toBeInTheDocument();
    expect(screen.getByText('Add new record')).toBeInTheDocument();
  });
});
