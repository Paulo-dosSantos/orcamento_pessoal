class Despesa{

	constructor(ano,mes,dia,tipo,descricao,valor){
		this.ano=ano;
		this.mes=mes;
		this.dia=dia;
		this.tipo=tipo;
		this.descricao=descricao;
		this.valor=valor;
	}
	validarDados(){
		for(let i in this){
			if(this[i]==undefined || this[i]==''|| this[i]==null){
				return false;
			}
			return true;
		}
	}



}
class Bd{

	constructor(){
		let id=localStorage.getItem('id');

		if(id===null){
			localStorage.setItem('id',0);
		}
	}

	getProximoId(){
		let proximoId=localStorage.getItem('id');//null
		return parseInt(proximoId)+1;
	}

	 gravar(d){

	//localStorage.setItem('despesa',JSON.stringify(d));
	 	let id= this.getProximoId();
	 	localStorage.setItem(id,JSON.stringify(d));
		localStorage.setItem('id',id);

}
}
let bd = new Bd();










function cadastrarDespesa(){

	let ano=document.getElementById('ano').value;
	let mes=document.getElementById('mes').value;
	let dia=document.getElementById('dia').value;
	let tipo=document.getElementById('tipo').value;
	let descricao=document.getElementById('descricao').value;
	let valor=document.getElementById('valor').value;


	let despesa= new Despesa(ano,mes,dia,tipo,descricao,valor);

	console.log(despesa);

	if(despesa.validarDados()){
		bd.gravar(despesa);
		$('#modalRegistraDespesa').modal('show');
		document.getElementById('modal_titulo').innerHTML = "Registro inserido com sucesso"
			document.getElementById('modal_titulo_div').className="modal-header text-success";
		document.getElementById('modal_conteudo').innerHTML="Despesa cadastrada com sucesso"
		document.getElementById('modal_btn').className="btn btn-success";
		document.getElementById('modal_btn').innerHTML="voltar";

		
			
	}
	else{
		$('#modalRegistraDespesa').modal('show')
		document.getElementById('modal_titulo').innerHTML = "Erro na gravação"
			document.getElementById('modal_titulo_div').className="modal-header text-danger";
			document.getElementById('modal_conteudo').innerHTML="Existem campos obrigatorios que não foram preenchidos"
			document.getElementById('modal_btn').className="btn btn-danger";
			document.getElementById('modal_btn').innerHTML="voltar e corrigir";
	}
	
}
