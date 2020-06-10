import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

export class CustomValidators {
  static minAge(minAge: number) {
    const validatorFn = Validators.min(minAge);
    return (control: AbstractControl): ValidationErrors | null => {
      const result = validatorFn(control);
      if (result == null) {
        return null;
      }
      return { minAge: { min: minAge, actual: control.value, message: `Minimum age is ${minAge}` } };
    };
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  lastNameControl: AbstractControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      age: [null, [Validators.required, CustomValidators.minAge(6)]]
    });
    this.lastNameControl = this.form.get('lastName')!;
  }

  onSubmit() {
    console.log('Submitted form', this.form);
  }
}
