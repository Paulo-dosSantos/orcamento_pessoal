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


	recuperarTodosRegistros(){
		let despesas= new Array();
		let id= localStorage.getItem('id');

		//recuperar todos os items cadastrados
		for(let i=1;i<=id;i++){

			let despesa= JSON.parse(localStorage.getItem(i));

			//existe a possibilidade destes items terem sido excluídos
			//Neste caso, deve haver um tratamento de exceção

			if(despesa===null){
				continue;
			}
			despesas.push(despesa);
			console.log(i,despesa);

		}
		return despesas;
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
function carregaListaDespesas(){
	let despesas= new Array();
	despesas=	bd.recuperarTodosRegistros();

	let listaDespesas= document.getElementById('listaDespesas');
	

	despesas.forEach( function(d){
		//faz parte do tbody e permite a criação de row
		let linha = listaDespesas.insertRow();

		//inserirColunas
		linha.insertCell(0).innerHTML=`${d.dia}/${d.mes}/${d.ano}`

		switch(d.tipo){

		case '1':
			d.tipo="Alimentação"
			break;

		case '2':
			d.tipo="Educação"
			break;

		case '3':
			d.tipo="Lazer"
			break;

		case '4':
			d.tipo="Saúde"
			break;

		case '5':
			d.tipo="Transporte"
			break;
		}




		linha.insertCell(1).innerHTML=d.tipo;

		//ajustar tipos

		





		linha.insertCell(2).innerHTML=d.descricao;
		linha.insertCell(3).innerHTML=d.valor;
		
	})



}
carregaListaDespesas();
