import { Component, ViewChild } from '@angular/core';
import { ToastController, IonSlides, AlertController  } from '@ionic/angular';
import * as $ from "jquery";

import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild("sliderAnkieta") sliderAnkieta!: IonSlides;
  surveyCode: number = 100000;
  surveyData: SurveyData = {
    University: "",
    Discipline: "",
    Semester: 0,
    Instructor: "",
    Subject: "",
    LessonType: "",
    Group: ""
  }

  questions: Array<string> = [
    '1. Na zajęciach była przekazywana wiedza zarówno teoretyczna jak i praktyczna.',
    '2. Zajęcia miały precyzyjnie określone założenia i cele.',
    '3. Zajęcia były prowadzone w sposób jasny i zrozumiały.',
    '4. Forma zajęć, wykorzystywane ćwiczenia i przykłady angażowały uczestników.',
    '5. Wykładowca dokonywał syntez i podsumować partii materiału.',
    '6. Wykładowca potrafił zainteresować słuchaczy omawianym tematem.',
    '7. Zajęcia realizowane były w przyjaznej i budującej atmosferze.'
  ];

  constructor(private toastController: ToastController, private alertController: AlertController) {}

  async ngOnInit() {
      const toast = await this.toastController.create({
        message: 'Proszę wypełnić sumiennie ankietę!',
        duration: 3000,
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

  async beforeSlideChange() {
    if (this.surveyCode == null || this.surveyCode < 100000) {
      this.sliderAnkieta.slideTo(0);
      
      const alert = await this.alertController.create({
        header: 'Błędny kod ankiety',
        message: 'Kod ankiety musi być z przedziału 100000-999999!',
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  }

  async showSurveyData(){
    await Haptics.vibrate();

    $.ajax({
      url: `https://surveyug.azurewebsites.net/courses/${this.surveyCode == 253435? 1: 2}`
    }).done((respose: SurveyDataDTO) => {
      this.surveyData = {
        University: respose.university,
        Discipline: respose.field,
        Semester: respose.sem,
        Instructor: respose.professor,
        Subject: respose.lecture,
        LessonType: respose.type,
        Group: respose.group
      }
    }).fail((xhr, status, message) => {
      alert(message)
    })

  // npm install jquery --save
  // npm i --save-dev @types/jquery

  // import * as $ from "jquery";
  }
}

interface SurveyData {
  University: string;
  Discipline: string;
  Semester: number;
  Instructor: string;
  Subject: string;
  LessonType: string;
  Group: string;
}

interface SurveyDataDTO {
  id: number,
  university: string;
  field: string;
  sem: number;
  professor: string;
  lecture: string;
  type: string;
  group: string;
  code: number
}