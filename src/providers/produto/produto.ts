
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class ProdutoProvider {

  constructor(private dbProvider: DatabaseProvider) {
    
  }


  public insert(produto:Produto){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'insert into produto (nome, preco, data, ativo, categoria_id) values (?, ?, ?, ?, ?)';
    let data = [produto.nome, produto.preco, produto.data, produto.ativo ? 1 : 0, produto.categoria_id];
    return db.executeSql(sql, data)
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));  

  }
  

  public update(produto:Produto){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'update produto set nome = ?, preco = ?, data = ?, ativo = ?, categoria_id = ? where id = ?';
    let data = [produto.nome, produto.preco, produto.data, produto.ativo ? 1 : 0, produto.categoria_id, produto.id];
    return db.executeSql(sql, data)
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));  
  }

  public remove(id:number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'delete from produto where id = ?'; //delete o produto cujo id seja...
    let data = [id]; //passado o id do produto a ser deletado
    return db.executeSql(sql, data)
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e)); 
  }

  public get(id:number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'select * from produto where id = ?'; //seleciona da tabela um campo cujo id seja ...
    let data = [id];  //passamos o id
    return db.executeSql(sql, data)

    .then((data:any) => { //verificar os dados 
      if(data.rows.length > 0){ //se os dados tiver em suas linhas maiores que 0
        let item = data.rows.item(0); //cria uma variavel que armazena o item buscado
        let produto = new Produto(); //cria um produto e recupera os dados
        produto.id = item.id;
        produto.nome = item.nome;
        produto.preco = item.preco;
        produto.data = item.data;
        produto.ativo = item.ativo;
        produto.categoria_id = item.categoria_id;
        return produto;
      }
      return null;
    })
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));
  }

  public getAll(ativo:boolean, nome:string = null){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT p.*, c.nome as categoria_nome FROM produto p inner join categoria c on p.categoria_id = c.id where p.ativo = ?';
      var data: any[] = [ativo ? 1 : 0];

    //filtrar pelo nome

    if(nome){
      sql += ' and p.nome like ?'
      data.push('%' + nome + '%');
      
    }

    return db.executeSql(sql, data)

    .then((data: any) => {
      if(data.rows.length > 0){
        let produtos: any[] = [];
            //de 0 ate o total de linhas 
        for(var i=0; i < data.rows.length; i++){
          var produto = data.rows.item(i);  //produto pega o produto de cada linha
          produtos.push(produto); //e adiciona ao array de produtos
        }
        return produtos;  //retorna os produtos encontrados

      }else{
        return [];
      }
    })
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));
  }




 

}

export class Produto{
    id:number;
    nome:string;
    preco:number;
    data:Date;
    ativo:Boolean;
    categoria_id:number;
}