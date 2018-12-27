import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarProdutoPage } from './editar-produto';

@NgModule({
  declarations: [
    EditarProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarProdutoPage),
  ],
})
export class EditarProdutoPageModule {}
