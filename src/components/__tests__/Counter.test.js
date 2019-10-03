import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as rtl from '@testing-library/react';
import Counter from '../Counter';

let tools;

beforeEach(() => {
  rtl.cleanup();
  tools = rtl.render(<Counter user='Peter' countLimit={5} />);
});

describe('Counter component', () => {
  it('can debug the output', () => {
    // tools.debug();
  });

  it('shows the correct user', () => {
    const elementWithJoshText = tools.queryByText(/peter/i);
    expect(elementWithJoshText).toBeInTheDocument();
  });

  it('initial count is zero', () => {
    const elementWithZero = tools.queryByText(/0/);
    expect(elementWithZero).toBeInTheDocument();
  });

  it('can increment the count by one by clicking increment', () => {
    const incButton = tools.queryByTestId('incButton');

    rtl.fireEvent.click(incButton);
    expect(tools.queryByText(/0/)).not.toBeInTheDocument();
    expect(tools.queryByText(/1/)).toBeInTheDocument();

    rtl.fireEvent.click(incButton);
    expect(tools.queryByText(/1/)).not.toBeInTheDocument();
    expect(tools.queryByText(/2/)).toBeInTheDocument();
  });

  it('can decrement the count by one by clicking decrement', () => {
    // implement
    const decButton = tools.queryByTestId('decButton');
    
    rtl.fireEvent.click(decButton);
    expect(tools.queryByText(/0/)).not.toBeInTheDocument();
    expect(tools.queryByText(/-1/)).toBeInTheDocument();

    rtl.fireEvent.click(decButton);
    expect(tools.queryByText(/-1/)).not.toBeInTheDocument();
    expect(tools.queryByText(/-2/)).toBeInTheDocument();
  });

  it('can reset the count clicking rest', () => {
    // implement
    const incButton = tools.queryByTestId('incButton');
    const decButton = tools.queryByTestId('decButton');
    const resetButton = tools.queryByTestId('resetButton');

    rtl.fireEvent.click(incButton);
    expect(tools.queryByText(/1/)).toBeInTheDocument();
    rtl.fireEvent.click(resetButton);
    expect(tools.queryByText(/0/)).toBeInTheDocument();
    expect(tools.queryByText(/1/)).not.toBeInTheDocument();
    
    rtl.fireEvent.click(decButton);
    expect(tools.queryByText(/-1/)).toBeInTheDocument();
    rtl.fireEvent.click(resetButton);
    expect(tools.queryByText(/0/)).toBeInTheDocument();
    expect(tools.queryByText(/-1/)).not.toBeInTheDocument();
  });

  it('prevents the count from going over an upper limit', () => {
    // implement
    const incButton = tools.queryByTestId('incButton');

    rtl.fireEvent.click(incButton);
    rtl.fireEvent.click(incButton);
    rtl.fireEvent.click(incButton);
    rtl.fireEvent.click(incButton);
    rtl.fireEvent.click(incButton);
    rtl.fireEvent.click(incButton);
    expect(tools.queryByText(/6/)).not.toBeInTheDocument();
    // tools.debug()

  });

  it('prevents the count from going under a lower limit', () => {
    // implement
    const decButton = tools.queryByTestId('decButton');

    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(decButton);
    expect(tools.queryByText(/-6/)).not.toBeInTheDocument();
  });

  it('shows a warning once we hit the upper limit of the counter', () => {
    // implement
    const incButton = tools.queryByTestId('incButton');

    rtl.fireEvent.click(incButton);
    rtl.fireEvent.click(incButton);
    rtl.fireEvent.click(incButton);
    rtl.fireEvent.click(incButton);
    rtl.fireEvent.click(incButton);
    rtl.fireEvent.click(incButton);
    //tools.debug();

    expect(tools.queryByText(/that's as high as/i)).toBeInTheDocument();
  });

  it('shows a warning once we hit the lower limit of the counter', () => {
    // implement
    const decButton = tools.queryByTestId('decButton');

    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(decButton);

    expect(tools.queryByText(/that's as low as/i)).toBeInTheDocument();
  });
});
