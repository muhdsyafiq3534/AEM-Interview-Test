import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  submitted = false;

  constructor(
    private AuthService: AuthService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(4),]),
    });
  }

  get username() { return this.loginForm.controls }

  get f() { return this.loginForm.controls; }



  get formControl() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid)
    {
      return;
    }
    this.AuthService.login(this.loginForm.get('username')!.value,this.loginForm!.get('password')!.value)
  }

}
