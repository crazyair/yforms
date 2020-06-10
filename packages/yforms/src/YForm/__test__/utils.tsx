import { act } from 'react-dom/test-utils';
import { ReactWrapper } from 'enzyme';

export const delay = (timeout = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

export async function waitForComponentToPaint<P = {}>(wrapper: ReactWrapper<P>, amount = 0) {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, amount));
    wrapper.update();
  });
}
