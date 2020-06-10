import { Inject, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { ErrorMessagePipe } from './error-message.pipe';
import { ErrorMessageResolver } from './error-message.resolver';
import { IfErrorsDirective } from './if-errors.directive';
import { ErrorResolveConfig } from './models';
import { ERROR_RESOLVE_CONFIG } from './tokens';

/**
 * The Angular module exporting the `IfErrorsDirective` and `ErrorMessagePipe`
 * @see IfErrorsDirective
 * @see ErrorMessagePipe
 */
@NgModule({
  declarations: [IfErrorsDirective, ErrorMessagePipe],
  exports: [IfErrorsDirective, ErrorMessagePipe]
})
export class NgxEasyErrorsModule {
  constructor(@Inject(ERROR_RESOLVE_CONFIG) config: ErrorResolveConfig) {
    config.useErrors = config.useErrors ?? 'prioritize';
    config.showCounter = config.showCounter ?? false;
    config.joinSeparator = config.joinSeparator ?? '\n';
    config.prioritize = config.prioritize ?? [];
  }

  /**
   * Factory-function to import the module in your root `AppModule`.
   * You must pass the class of your `ErrorMessageResolver` implementation.
   * You may also provide a partial config, to override default behaviour.
   *
   * **Defaults**
   * ```
   * {
   *   useErrors: 'prioritize',
   *   showCounter: false,
   *   joinSeparator: '\n',
   *   prioritize: []
   * }
   * ```
   * @param formErrorResolverClass the class to use as the `ErrorMessageResolver`
   * @param config an optional config to override default behaviour
   */
  static forRoot(
    formErrorResolverClass: Type<ErrorMessageResolver>,
    config: Partial<ErrorResolveConfig> = {}
  ): ModuleWithProviders {
    return {
      ngModule: NgxEasyErrorsModule,
      providers: [
        { provide: ERROR_RESOLVE_CONFIG, useValue: config },
        { provide: ErrorMessageResolver, useClass: formErrorResolverClass }
      ]
    };
  }
}
