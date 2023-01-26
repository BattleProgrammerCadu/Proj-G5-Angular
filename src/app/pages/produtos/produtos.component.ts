import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from 'src/app/modules/produtos.module';
import { ProdutosService } from 'src/app/services/produtos.service';
import { ViewProdutoModalComponent } from 'src/app/pages/modals/produto-modal/view-produto-modal.component';
import { CreateProdutoModalComponent } from 'src/app/pages/modals/produto-modal/create-produto-modal.component';
import { EditProdutoModalComponent } from 'src/app/pages/modals/produto-modal/edit-produto-modal.component';
import { DeleteProdutoModalComponent } from 'src/app/pages/modals/produto-modal/delete-produto-modal.component';
import { LoginStatusService } from 'src/app/services/login-status.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
    private loginStatusService: LoginStatusService,
    private modalService: NgbModal
  ) { }
  
  ngOnInit(): void {
    if(this.loginStatusService.redirectNãoLogado()) return
    this.listarProdutos(1)
    this.listarInformacoesProdutos()
  }

  public produtos:Produto[] | undefined = []

  private paginaAtual: number= 1;
  private numeroPaginas: number = 1

  public async listarProdutos(pagina: number){
    this.produtos = await new ProdutosService(this.http).lista(pagina);
  }

  modalViewProduto(produto:Produto){
    const modalRef = this.modalService.open(ViewProdutoModalComponent);
    modalRef.componentInstance.produto = produto;
  }

  modalCreateProduto(){
    const modalRef = this.modalService.open(CreateProdutoModalComponent);
  }

  modalEditProduto(produto:Produto){
    const modalRef = this.modalService.open(EditProdutoModalComponent);
    modalRef.componentInstance.produto = produto;  
  }

  modalDeleteProduto(produto:Produto){
    const modalRef = this.modalService.open(DeleteProdutoModalComponent);
    modalRef.componentInstance.produto = produto;
  }

  private async listarInformacoesProdutos(){
    let pagina = await new ProdutosService(this.http).InformacoesProdutos();
    this.numeroPaginas = pagina.numeroPaginas;
    console.log(pagina.numeroPaginas)
  }

  proximaPagina(){
    if(this.paginaAtual<=this.numeroPaginas) this.listarProdutos((this.paginaAtual = this.paginaAtual + 1))
  }

  paginaAnterior(){
    if(this.paginaAtual>1) this.listarProdutos((this.paginaAtual = this.paginaAtual - 1))
  }

}
