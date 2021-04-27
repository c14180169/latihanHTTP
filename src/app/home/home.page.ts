import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataPOST = [];
  loading : any;
  post : any = {};

  constructor(
    private http : HttpClient,
    private loadCtrl : LoadingController,
    private toastCtrl : ToastController,
    private router : Router
  ) {}


  ionViewDidEnter(){
    this.getDataPost();
  } 

  public async loaderPresent() : Promise<any> {
    const loading  = await this.loadCtrl.create({
      message : "LOADING ...",
      backdropDismiss : true
    });
    await loading.present();

    return loading;
  }
  
  async getDataPost(){

    this.loading = await this.loaderPresent();

    this.http.get("https://reqres.in/api/users?page=2").subscribe((res : any) => {
      console.log(res);
      this.dataPOST = res['data'];

      if(this.loading) {
        this.loading.dismiss();
      }
    })
  }

  toHalDua(){
    this.router.navigate(['hal-dua']);
  }

  
}
