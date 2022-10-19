// Note: We are doing snapshot testing. Make sure the snapshot
// tests are passing, before updating the snapshot, otherwise
// you'll have no guarantee that the output is what's expected.
// Notable things that would make the snapshot to be updated:
// - changing the generator template "HTML" itself
// - changing the styles
// - updating the TEST_RATES mocked rates
// - changing the default values in the generator form.
// - etc. (anything that would affect the resulting markup)
jest.mock('copy-to-clipboard');
import copy from 'copy-to-clipboard';
import React from 'react';
import ConditionalCTA from './ConditionalCTA';
import { unmountComponentAtNode } from 'react-dom';
import styles from '../utils/styles';
import { render, fireEvent } from '@testing-library/react';

const TEST_RATES = {
  AUD: 1.485332,
  CAD: 1.321722,
  CHF: 0.970775,
  EUR: 0.907715,
  GBP: 0.769694,
  NZD: 1.536972,
  USD: 1,
};

describe('ConditionalCTA Component', () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('It renders', () => {
    const { container } = render(
      <ConditionalCTA
        url="https://actions.sumofus.org/a/donate"
        rates={TEST_RATES}
        lang="en"
        styles={styles.rebranding}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('#nonDonorTemplate', () => {
    const { getByTestId } = render(
      <ConditionalCTA
        url="https://actions.sumofus.org/a/donate"
        rates={TEST_RATES}
        lang="en"
        styles={styles.rebranding}
      />
    );
    fireEvent.click(getByTestId('body-button'));
    const snapshot = copy.mock.calls[0][0];
    expect(snapshot).toMatchSnapshot();
  });

  test('#donorTemplate', () => {
    const { getByTestId } = render(
      <ConditionalCTA
        url="https://actions.sumofus.org/a/donate"
        rates={TEST_RATES}
        lang="en"
        styles={styles.rebranding}
      />
    );
    fireEvent.click(getByTestId('box-button'));
    const snapshot = copy.mock.calls[0][0];
    expect(snapshot).toMatchSnapshot();
  });
});
