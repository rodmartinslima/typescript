const txtTarefa = document.querySelector('.edt-tarefa');
const btnInserir = document.querySelector('.btn-inserir');
const lista = document.querySelector('.lista-tarefas')

function inserirLi(){
  const novoLi = document.createElement('li');
  return novoLi;
}

function inserirTarefa(tarefa){
  const li = inserirLi();
  li.innerText = tarefa;
  lista.appendChild(li);
  apagarTarefa();
  CriaBtnApagar(li)
  salvarTarefas();
}

function apagarTarefa(){
  txtTarefa.value = '';
  txtTarefa.focus();
}

btnInserir.addEventListener('click', function(){
  if (!txtTarefa.value) return;  
  inserirTarefa(txtTarefa.value);
});

txtTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!txtTarefa.value) return;
    inserirTarefa(txtTarefa.value);
  }
});

function CriaBtnApagar(li){
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar Tarefa';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
};

document.addEventListener('click', function(e) {
  const apagarElemento = e.target;
  if (apagarElemento.classList.contains('apagar')) {
    apagarElemento.parentElement.remove();
    salvarTarefas();
  }
});

function LimparDadosExtras(txt) {
  txt = txt.replace('Tarefa', '').trim();
  txt = txt.replace('Apagar', '').trim();
  return txt;
}

function salvarTarefas() {
  const liTarefas = lista.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = LimparDadosExtras(tarefaTexto);
    listaDeTarefas.push(tarefaTexto);
  }
  
  console.log(listaDeTarefas);
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas) {
    console.log(tarefa);
    inserirTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
