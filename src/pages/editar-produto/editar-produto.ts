import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Produto, ProdutoProvider } from '../../providers/produto/produto';
import { CategoriaProvider } from '../../providers/categoria/categoria';

/**
 * Generated class for the EditarProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-produto',
  templateUrl: 'editar-produto.html',
})
export class EditarProdutoPage {
  model:Produto;  //carrega os campos do produto
  categorias:any[]; //carega as informaçoes da categoria

  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private produtoProvider: ProdutoProvider,
    private toast: ToastController,
    private categoriaProvider: CategoriaProvider
  ) {

    this.model = new Produto(); //instancio para acessar os metodos do profuto

    if(this.navParams.data.id){ //se passar um id quero consultar o item
      this.produtoProvider.get(this.navParams.data.id)
      .then((result:any)=>{
          this.model = result; //salva no model o resultado obtido
      });
    }
  }

  ionViewDidEnter() {
    this.categoriaProvider.getAll()
    .then((result:any)=>{
      this.categorias = result;

    })
    .catch(()=>{
    this.toast.create({message: 'Erro ao carregar categorias', duration:3000, position: 'button'}).present();
    })
  }


  save() {
    this.salvarProduto()
      .then(() => {
        this.toast.create({ message: 'Produto salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o produto.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  private salvarProduto() {
    if (this.model.id) {
      return this.produtoProvider.update(this.model);
    } else {
      return this.produtoProvider.insert(this.model);
    }
  }

}
