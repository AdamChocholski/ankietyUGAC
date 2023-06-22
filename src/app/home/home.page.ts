import { Component, ViewChild } from '@angular/core';
import { ToastController, IonSlides, AlertController  } from '@ionic/angular';
import * as $ from "jquery";
import { Camera, CameraResultType } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild("sliderAnkieta") sliderAnkieta!: IonSlides;
  paczkaInfo: PaczkaInfo ={
    infopodst: "",
    infododatkowe: "",
    infoUszkodzenia: "",
  }
  PaczkaPodstawowe: string = "";
  NumerPaczki: number = 0;
isDarkMode = false;


  constructor(private toastController: ToastController, private alertController: AlertController) {}

  async ngOnInit() {
      const toast = await this.toastController.create({
        message: 'Witamy w CubbyMate!',
        duration: 4000,
        position: 'bottom',
        
      });
  
      await toast.present();
  }

  moveToNextSlide() {
    this.sliderAnkieta.slideNext();
  }

  moveToPreviousSlide(){
    this.sliderAnkieta.slidePrev();
  }

  async przydodaniukod() {
    if (this.NumerPaczki == null || this.NumerPaczki > 100000 || this.NumerPaczki ==0 ) {
      Haptics.vibrate();
      this.sliderAnkieta.slideTo(1);
      
      const alert = await this.alertController.create({
        header: 'Błędny kod Paczki',
        message: 'Kod paczki musi być z przedziału 1-99999!',
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  }
  async przydodaniuinfo() {
    if (this.PaczkaPodstawowe.length == 0) {
      Haptics.vibrate();
      this.sliderAnkieta.slideTo(1);
      
      
      const alert = await this.alertController.create({
        header: 'Błędne Informacje Paczki',
        message: 'Podaj Informacje podstawowe na temat paczki',
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });
    var img = document.getElementById('myImage') as HTMLImageElement;
    img.src = "data:image/png;base64," + image.base64String;
  }

  toggleDarkMode() {
    Haptics.impact({ style: ImpactStyle.Light });
    if (this.isDarkMode) {
      
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark');
    console.log(this.isDarkMode);
    } else {
    
      document.body.classList.toggle('light');
      console.log(this.isDarkMode);
    }
    
  }
  
 
}

interface PaczkaInfo{
  infopodst: string;
  infododatkowe: string;
  infoUszkodzenia: string;

}