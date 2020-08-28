import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import CountCard from './CountCard';

describe('CountCard component', () => {
  const mockHandler = jest.fn();
  const title = 'A nettoyer';
  const count = 0;
  const color = 'pink' as 'pink' | 'grey' | 'green';
  const mockProps = {
    title,
    count,
    color,
    isActive: true,
    handler: mockHandler,
  };

  it('it renders passed title and count', async () => {
    const { getByText } = render(<CountCard {...mockProps} />);
    await waitForElement(() => getByText(title));
    await waitForElement(() => getByText(count.toString()));
  });

  it('calls the handler on a click', () => {
    const { getByText } = render(<CountCard {...mockProps} />);
    fireEvent.click(getByText(count.toString()));
    expect(mockHandler).toHaveBeenCalledTimes(1);
    mockHandler.mockReset();
  });

  it('highlights bottom if active', () => {
    const { queryByTestId } = render(<CountCard {...mockProps} isActive={true} />);
    expect(queryByTestId('body')).toHaveClass(`bottom-${color}`);
  });
});
