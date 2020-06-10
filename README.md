# ngx-easy-errors  <a href="https://www.github.com/JanMalch/ngx-easy-errors"><img src="https://raw.githubusercontent.com/JanMalch/ngx-easy-errors/master/.github/assets/logo.svg" width="90" height="90" align="right"></a>  

[![npm](https://img.shields.io/npm/v/ngx-easy-errors?style=flat-square)](https://www.npmjs.com/package/ngx-easy-errors)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors)

<i>Simplify error handling for reactive forms.</i>    

## Features

- ✅ reduce boilerplate in templates
- ✅ use with any UI library
- ✅ use with any i18n library 
- ✅ keep your code clean

## Installation

```
npm i ngx-easy-errors
```

### In your app

Import the `NgxEasyErrorsModule` via `forRoot` in your `AppModule` and provide an error message resolver.

```ts
@Injectable()
export class MyFormErrorResolver extends ErrorMessageResolver {
  resolveErrorMessage(errorKey: string, error: any): string {
    // I recommend adding a message field in your custom validators
    if (error.hasOwnProperty('message')) {
      return error.message;
    }
    // Angular errors and fallback
    switch (errorKey) {
      case 'min': return `Value must be greater than or equal to ${error.min}`;
      case 'max': return `Value must be less than or equal to ${error.max}`;
      case 'required': return `Value is required`;
      case 'email': return `Value must be a valid email address`;
      case 'minlength': return `The value's length must be greater than or equal to ${error.requiredLength}`;
      case 'maxlength': return `The value's length must be less than or equal to ${error.requiredLength}`;
      case 'pattern': return `The value must match the pattern ${error.requiredPattern}`;
      default: return `Invalid value (Code: ${errorKey})`;
    }
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEasyErrorsModule.forRoot(MyFormErrorResolver)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Check out the [docs](https://janmalch.github.io/ngx-easy-errors/classes/ngxeasyerrorsmodule.html#forroot) 
for more info and how to override the default behaviour.

Only import the `NgxEasyErrorsModule` in lazy-loaded modules:

```typescript
@NgModule({
  imports: [NgxEasyErrorsModule],
  exports: [NgxEasyErrorsModule]
})
export class SharedModule { }
```

## Usage

After setting up your modules, you have access to the `ngxIfErrors` directive and `errorMessage` pipe.


**1. Setup your reactive form as always**

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: [null, [Validators.required, CustomValidators.minAge(6)]]
    });
  }

  onSubmit() {
    console.log('Submitted form', this.form);
  }
}
```

**2. Combine the directive and pipe**

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div>
    <input formControlName="firstName" placeholder="first name">
    <span *ngxIfErrors="let errs of 'firstName'" class="error">
      {{ errs | errorMessage }}
    </span>
  </div>
  <div>
    <input formControlName="lastName" placeholder="last name">
    <span *ngxIfErrors="let errs of 'lastName'" class="error">
      {{ errs | errorMessage }}
    </span>
  </div>
  <div>
    <input formControlName="age" type="number" placeholder="age">
    <span *ngxIfErrors="let errs of 'age'" class="error">
      <!-- prioritize minAge message over required -->
      {{ errs | errorMessage: 'minAge' }}
    </span>
  </div>
  <button type="submit" [disabled]="form.invalid">SUBMIT</button>
</form>
```

Find out more in the [integration app](https://github.com/JanMalch/ngx-easy-errors/blob/master/src/app/app.component.html#L10)
and in the [docs](https://janmalch.github.io/ngx-easy-errors).
Feel free to clone the repository and experiment with the integration app.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

Boilerplate created with [@ngneat/lib](https://github.com/ngneat/lib#readme).
