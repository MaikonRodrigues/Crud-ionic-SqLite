import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    dbProvider: DatabaseProvider
  ) {
    platform.ready().then(() => { //quando le a função começa a criar as telas do aplicativo  
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      dbProvider.criarDatabase()
        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          this.openHomePage(splashScreen);
        })
        .catch(() => {
          // ou se houver erro na criação do banco
          this.openHomePage(splashScreen);
        });
    });

    
  }
  // Função que chama a tabspage
private openHomePage(splashScreen: SplashScreen){
  splashScreen.hide();
  this.rootPage = TabsPage;
}

}
 