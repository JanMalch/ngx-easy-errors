/**
 * A configuration object used for resolving form error messages.
 * @see ErrorMessagePipe
 */
export interface ErrorResolveConfig {
  /**
   * Determines which error(s) to use for the message.
   * - `any` will pick any error in a non-deterministic way.
   * - with `prioritize` you can prioritize certain error keys, if they are present
   * - `all` uses all present errors and concatenates the messages
   */
  useErrors: 'any' | 'prioritize' | 'all';
  /**
   * Set to `true`, when the displayed message should show how many more errors their are. Defaults to `false`.
   * To show the counter the following conditions must also be met:
   * - `useErrors` is set to 'any' or 'prioritize'
   * - there are at least 2 errors present
   * Only then `ErrorMessageResolver#applyCounterMessage` will be called.
   * @see ErrorMessageResolver#applyCounterMessage
   */
  showCounter: boolean;
  /**
   * The error keys (e.g. `'min'` or `'required'`) to prioritize for the displayed message, if they are present.
   */
  prioritize: string[];
  /**
   * The join separator to concat the messages, when `useErrors` is set to `'all'`.
   */
  joinSeparator: string;
}
