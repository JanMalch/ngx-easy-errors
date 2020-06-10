import { InjectionToken } from '@angular/core';
import { ErrorResolveConfig } from './models';

/**
 * `InjectionToken` to define the global config, that will be used by the `ErrorMessagePipe`.
 * @see ErrorMessagePipe
 */
export const ERROR_RESOLVE_CONFIG = new InjectionToken<Partial<ErrorResolveConfig>>('ERROR_RESOLVE_CONFIG');
