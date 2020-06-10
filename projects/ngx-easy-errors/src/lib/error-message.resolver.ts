export abstract class ErrorMessageResolver {
  /**
   * Adds an info how many more errors their are.
   * This will only be called
   * - if `showCounter` is set to `true` ,
   * - and if the `totalErrorCount` is at least 2,
   * - and `useErrors` is set to 'any' or 'prioritize'
   *
   * @param message the determined message for the error
   * @param totalErrorCount the total number of errors
   * @see ErrorResolveConfig#showCounter
   * @example
   * <pre>
   * applyCounterMessage(message: string, totalErrorCount: number): string {
   *   // this is also the default behaviour
   *   return `${message} (1/${totalErrorCount})`
   * }
   * </pre>
   */
  applyCounterMessage(message: string, totalErrorCount: number): string {
    return `${message} (1/${totalErrorCount})`;
  }

  /**
   * Returns a human-readable message, based on the given `errorKey` and `error`.
   * @param errorKey the error key, e.g. `'min'` or `'required'`
   * @param error the error value, e.g. `true` or `{ min: 5, actual: 4 }`
   */
  abstract resolveErrorMessage(errorKey: string, error: any): string;
}
