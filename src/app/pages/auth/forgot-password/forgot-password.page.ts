import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  form = new FormGroup({
    // username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  constructor(private router: Router) { }

  ngOnInit() {
  }

  // submit() {
  //   if(this.form.valid){
  //     console.log(this.form.value)

  //     this.router.navigate(['/auth']);
  //   }
  // }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();

      await loading.present();

      this.firebaseService.sendRecoveryEmail(this.form.value.email)
        .then(resp => {

          this.utilsService.presentToast({
            message: 'Revise su correo para cambiar la contraseña',
            duration: 5000,
            color: 'primary',
            position: 'bottom',
            icon: 'mail-outline'
          })

          this.utilsService.routerLink('/auth')
          this.form.reset()
          
        }).catch(error => {
          console.log(error);
          this.utilsService.presentToast({
            message: error.message,
            duration: 2500,
            color: 'danger',
            position: 'bottom',
            icon: 'alert-circle-outline'
          })
        }).finally(() => {
          loading.dismiss();
        })


      // const username = this.form.value.username || '';

      // sessionStorage.setItem('username', username);

      // this.router.navigate(['/main/home']);

      // console.log(this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}