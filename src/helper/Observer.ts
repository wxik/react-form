/**
 *
 * @author wxik
 * @since 2023-02-27 11:50
 */

import {isObservable, observable, observe, raw, unobserve} from '@nx-js/observer-util';

export function autoRun<Reaction extends Function>(func: Reaction, delay = 0) {
  let dt: any = null;
  let action: any = null;
  const scheduler = (reaction: Function) => {
    action = reaction;
    dt && clearTimeout(dt);
    dt = setTimeout(() => {
      dt = null;
      action && action();
    }, delay);
  };
  return observe(func, {scheduler});
}

export {isObservable, observable, raw, unobserve};
