import { Component, ViewChild } from '@angular/core';
import { ToastController, IonSlides, AlertController  } from '@ionic/angular';
import * as $ from "jquery";
import { PhotoService } from '../services/photo.service';

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


  constructor(private toastController: ToastController, private alertController: AlertController, public photoservice: PhotoService) {}

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
    this.photoservice.takePicture();
  }
 
}

interface PaczkaInfo{
  infopodst: string;
  infododatkowe: string;
  infoUszkodzenia: string;

}