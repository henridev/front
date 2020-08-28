import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import IsUsedFooter from './IsUsedFooter';

describe('IsUsedFooter component', () => {
  const mockHandler = jest.fn();
  const mockProps = {
    isUsed: true,
    id: 1,
    isPcc: true,
    onChangeHandler: mockHandler,
  };

  it('it renders toggle only for pcc', async () => {
    const { getByTestId } = render(<IsUsedFooter {...mockProps} />);
    await waitForElement(() => getByTestId('pcc-only'));
  });

  it('it renders correct notation based on usage and role', async () => {
    const { getByText, rerender } = render(<IsUsedFooter {...mockProps} isUsed={true} />);
    await waitForElement(() => getByText('Oui'));

    rerender(<IsUsedFooter {...mockProps} isUsed={true} />);
    await waitForElement(() => getByText('Utilisé'));

    rerender(<IsUsedFooter {...mockProps} isUsed={false} />);
    await waitForElement(() => getByText('Non'));

    rerender(<IsUsedFooter {...mockProps} isUsed={false} />);
    await waitForElement(() => getByText('Non utilisé'));
  });
});
