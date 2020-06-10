import { Directive, Input, OnDestroy, OnInit, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, merge, Subscription } from 'rxjs';

/**
 * The context for the template of the structural directive
 */
export class IfErrorsContext {
  public readonly $implicit: ValidationErrors;

  constructor(public readonly ngxIfErrors: ValidationErrors) {
    this.$implicit = this.ngxIfErrors;
  }
}

/**
 * A structural directive, that will only render its template , if the given
 * control has errors.
 * @see control
 * @see condition
 * @example
 * <pre>
 * &lt;form [formGroup]="form">
 *   &lt;div>
 *     &lt;input formControlName="firstName" placeholder="first name">
 *     &lt;span *ngxIfErrors="let errs of 'firstName'" class="error">
 *     {{ errs | errorMessage }}
 *     &lt;/span>
 *   &lt;/div>
 *   &lt;button type="submit" [disabled]="form.invalid">SUBMIT&lt;/button>
 * &lt;/form>
 * &lt;/pre>
 */
@Directive({
  selector: '[ngxIfErrors][ngxIfErrorsOf]'
})
export class IfErrorsDirective implements OnInit, OnDestroy {
  /**
   * The connected control, that must be present in the `OnInit` hook.
   */
  @Input('ngxIfErrorsOf') control: Array<string | number> | string | AbstractControl;

  /**
   * An additional optional condition that must be `true` to render the `template`.
   * @param value the condition
   */
  @Input('ngxIfErrorsAndIf') set condition(value: boolean) {
    this._condition$.next(value);
  }

  private readonly _condition$ = new BehaviorSubject<boolean>(true);

  private subscription: Subscription;

  constructor(
    private vcr: ViewContainerRef,
    private tmplRef: TemplateRef<IfErrorsContext>,
    @Optional() private formGroupDirective: FormGroupDirective
  ) {}

  /**
   * Setups the flow, that will render or remove the given template.
   * The control must be defined at this point.
   */
  ngOnInit() {
    const ctrl =
      this.control instanceof AbstractControl ? this.control : this.formGroupDirective?.form?.get(this.control);
    if (ctrl == null) {
      throw new Error(`Control ${JSON.stringify(this.control)} could not be found`);
    }
    // type of error may change via value change but not by status
    this.subscription = merge(this._condition$, ctrl.valueChanges).subscribe(() => {
      this.vcr.clear();
      if (this._condition$.getValue() && ctrl.errors != null) {
        this.vcr.createEmbeddedView(this.tmplRef, new IfErrorsContext(ctrl.errors));
      }
    });
  }

  /**
   * Cleans up when destroyed.
   */
  ngOnDestroy() {
    this._condition$.complete();
    this.subscription?.unsubscribe();
  }
}
