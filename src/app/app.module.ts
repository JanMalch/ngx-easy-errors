import { Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorMessageResolver, NgxEasyErrorsModule } from 'ngx-easy-errors';

import { AppComponent } from './app.component';

@Injectable()
export class MyFormErrorResolver extends ErrorMessageResolver {
  resolveErrorMessage(errorKey: string, error: any): string {
    // I recommend adding a message field in your custom validators
    if (error.hasOwnProperty('message')) {
      return error.message;
    }
    // Angular errors and fallback
    switch (errorKey) {
      case 'min':
        return `Value must be greater than or equal to ${error.min}`;
      case 'max':
        return `Value must be less than or equal to ${error.max}`;
      case 'required':
        return `Value is required`;
      case 'email':
        return `Value must be a valid email address`;
      case 'minlength':
        return `The value's length must be greater than or equal to ${error.requiredLength}`;
      case 'maxlength':
        return `The value's length must be less than or equal to ${error.requiredLength}`;
      case 'pattern':
        return `The value must match the pattern ${error.requiredPattern}`;
      default:
        return `Invalid value (Code: ${errorKey})`;
    }
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgxEasyErrorsModule.forRoot(MyFormErrorResolver)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
