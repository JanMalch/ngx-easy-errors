import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessageResolver } from './error-message.resolver';
import { ErrorResolveConfig } from './models';
import { ERROR_RESOLVE_CONFIG } from './tokens';

/**
 * Transforms given errors to a human-readable message, based on the given options
 * @see transform
 */
@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {
  constructor(
    @Inject(ERROR_RESOLVE_CONFIG) private readonly config: ErrorResolveConfig,
    private resolver: ErrorMessageResolver
  ) {}

  protected getLocalConfig(args: any[]): ErrorResolveConfig {
    const localConfig = { ...this.config };
    if (args.length === 0) {
      return localConfig;
    }
    if (args[0] != null && typeof args[0] === 'object') {
      Object.assign(localConfig, ...args[0]);
    } else {
      localConfig.useErrors = 'prioritize';
      localConfig.prioritize = args;
    }
    return localConfig;
  }

  /**
   * Returns a single human-readable message, based on the given errors and prioritization.
   * Note that if `useErrors` will be effectively set to `prioritize` even if it's globally set to 'any' or 'all'.
   * If `errors` are `null`, the method will return `null`.
   * @param errors the validation errors of the control
   * @param prioritize error keys to prioritize
   */
  transform(errors: ValidationErrors | null, ...prioritize: string[]): string | null;
  /**
   * Returns a single human-readable message, based on the given errors and options.
   * If `errors` are `null`, the method will return `null`.
   * @param errors the validation errors of the control
   * @param config a partial config to override the global behaviour
   */
  transform(errors: ValidationErrors | null, config: Partial<ErrorResolveConfig>): string | null;
  transform(errors: ValidationErrors | null, ...args: any[]): string | null {
    if (errors == null) {
      return null;
    }
    const keys = Object.keys(errors);
    if (keys.length === 0) {
      return null;
    }
    const localConfig = this.getLocalConfig(args);

    if (localConfig.useErrors === 'all') {
      return keys.map(key => this.resolver.resolveErrorMessage(key, errors[key])).join(localConfig.joinSeparator);
    }

    let usedKey: any;
    if (localConfig.useErrors === 'prioritize') {
      usedKey = keys.find(key => localConfig.prioritize.includes(key)) ?? keys[0];
    } else {
      usedKey = keys[0];
    }
    const baseMessage = this.resolver.resolveErrorMessage(usedKey, errors[usedKey]);
    if (localConfig.showCounter && keys.length > 1) {
      return this.resolver.applyCounterMessage(baseMessage, keys.length);
    }
    return baseMessage;
  }
}
