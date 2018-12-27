import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ProdutoProvider, Produto } from '../../providers/produto/produto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  produtos: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(
    public navCtrl: NavController,
    private toast: ToastController,
    private providerProdutos:ProdutoProvider
    ) {

  }

  ionViewDidEnter(){
    this.getAllProdutos();
  }

  getAllProdutos(){
    this.providerProdutos.getAll(!this.onlyInactives, this.searchText)
    .then((result: any[]) => {
      this.produtos = result;
    } );
  }

  addProdutos(){
    this.navCtrl.push('EditarProdutoPage');
  }

  editarProdutos(id:number){
    this.navCtrl.push('EditarProdutoPage', {id: id});
  }

  removerProdutos(produto:Produto){
    this.providerProdutos.remove(produto.id)
    .then(() => {
     var index = this.produtos.indexOf(produto);
     this.produtos.splice(index, 1);
     this.toast.create({message: 'Produto Removido.', duration: 3000, position:'botton'}).present();
    } );

  }

  fitrarProdutos(ev: any){
    this.getAllProdutos();
  }

}
