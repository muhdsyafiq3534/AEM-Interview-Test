import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  submitted = false;

  constructor(private AuthService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
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
