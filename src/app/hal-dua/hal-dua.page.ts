import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-hal-dua',
  templateUrl: './hal-dua.page.html',
  styleUrls: ['./hal-dua.page.scss'],
})
export class HalDuaPage implements OnInit {

  post : any = {};
  post_edit : any = {};
  dataPOST = [];
  loading : any;
  id_select_del: any;
  id_select_edit: any;
  

  constructor(
    private http : HttpClient,
    private loadCtrl : LoadingController,
    private toastCtrl : ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

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

  async addData() {
    this.loading = await this.loaderPresent();

    this.http.post("https://reqres.in/api/users?page=2", this.post).subscribe((res : any) => {
      console.log(res);

      if(this.loading) {
        this.loading.dismiss();

        this.post.email = "";
        this.post.first = "";
        this.post.last = "";
      }

      this.toastCtrl.create({
        duration : 3000,
        message : "ID for new Item is " + res.id
      }).then(l => l.present())
    })
  }

  async editData(){
    this.loading = await this.loaderPresent();

    const body = {
      id : this.id_select_edit,
      email : this.post_edit.email,
      first : this.post_edit.first,
      last : this.post_edit.last
    }

    this.http.put("https://reqres.in/api/users/" + this.id_select_edit, body).subscribe((res : any) => {
      console.log(res);

      if(this.loading) {
        this.loading.dismiss();

        this.post_edit.email = "";
        this.post_edit.first = "";
        this.post_edit.last = "";
      }

      this.toastCtrl.create({
        duration : 3000,
        message : "Item no " + this.id_select_edit + " edited successfully"
      }).then(l => l.present())
    })
  }

  deleteBtn(){
    this.presentAlertConfirm();
  }

  async deleteData(){
    this.loading = await this.loaderPresent();

    this.http.delete("https://reqres.in/api/users/" + this.id_select_del).subscribe((res : any) => {
    
      if(this.loading) {
        this.loading.dismiss();
      }

      this.toastCtrl.create({
        duration : 3000,
        message : "Item no " + this.id_select_del + " deleted successfully"
      }).then(l => l.present())
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Konfirmasi',
      message: 'Anda yakin menghapus item dengan ID ' + this.id_select_del,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelled');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteData()
          }
        }
      ]
    });

    await alert.present();
  }
}
