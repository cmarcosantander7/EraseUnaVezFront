import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {IniciosesionService} from "../../../services/iniciosesion.service";
import {throwError} from "rxjs";
import Swal from "sweetalert2";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLinear = true;
  loginForm?: FormGroup;
  user:User= new User();
  email?:String;
//Obtiene los datos del inicio de sesión
  public userRequest: User = new User();
  //Habilita ek incio o el cierre de sesión
  habilitar: boolean = true;
  constructor(private iniciosesionService: IniciosesionService, private activatedRoute: ActivatedRoute,
              private router: Router, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.loginForm= this._formBuilder.group({
      email:['', Validators.required],
      clave:['', Validators.required],
    });
  }

  login(user:User) {
    this.iniciosesionService.Login(this.user).subscribe(data => {
        Swal.fire({
          title: 'Inicio de sesión exitosa',
          text: 'Bienvenido ' + data.username,
          icon: 'success',
          iconColor: '#0c3255',
          color: "#0c3255",
          confirmButtonColor: "#0c3255",
          background: "white",

        })
      sessionStorage.setItem('user', JSON.stringify(data));
      console.log(data)
        this.router.navigate(['/panel/cuentoss/bienvenida']);
      }, err => {
        Swal.fire({
          title: 'Usuario y/o constraseña incorrectos',
          text: err.error.message,
          icon: 'warning',
          color: "#0c3255",
          confirmButtonColor: "#0c3255",
          background: "white",
        })
      }
    )

  }



  irsignup():void{
    this.router.navigate(['/auth/signup']);
  }
}
