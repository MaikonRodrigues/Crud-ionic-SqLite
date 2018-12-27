import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class CategoriaProvider {

  constructor(private dbProvider: DatabaseProvider) {
    
  }


  public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    
    return db.executeSql('select * from categoria', []) 

    .then((data: any) => {
      if(data.rows.length > 0){
        let categorias: any[] = [];

        for(var i=0; i<data.rows.length; i++){
          var categoria = data.rows.item(i);
          categorias.push(categoria);
        }
        return categorias;

      }else{
        return [];
        
      }
    })
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));
  }

}
