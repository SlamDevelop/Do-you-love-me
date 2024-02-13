import {
  EffectFunction,
  MemoOptions,
  NoInfer,
  Signal,
  createComputed,
  createSignal,
} from "solid-js";

/**
 * Creates a memo that can be updated manually.
 *
 * @example
 *
 * ```tsx
 * const [a, setA] = createSignal(0);
 * // memo "b" will be updated each time the "a" is updated
 * // and also "b" can be updated independently with "setB".
 * const [b, setB] = createWritableMemo(() => a() * 3);
 * ```
 */
export function createWritableMemo<Next extends Prev, Prev = Next>(
  fn: EffectFunction<undefined | NoInfer<Prev>, Next>
): Signal<Next>;
export function createWritableMemo<Next extends Prev, Init = Next, Prev = Next>(
  fn: EffectFunction<Init | Prev, Next>,
  value: Init,
  options?: MemoOptions<Next>
): Signal<Next>;
export function createWritableMemo<T>(
  fn: (prev: T | undefined) => T,
  value?: T,
  options?: MemoOptions<T | undefined>
): Signal<T> {
  const signal = createSignal(value, options);

  createComputed(() => signal[1](fn));

  return signal as Signal<T>;
}
