let listaNumerosSorteados = [] // Lista para guardar os números que já foram sorteados
let numeroLimite = 10  // Limite máximo do número secreto
let numeroSecreto = gerarNumeroAleatorio() // Gera um número secreto ao iniciar o jogo
let tentativas = 1 // Conta quantas tentativas o jogador já fez

//tem parametro, texto mas nao retona nada
function exibirTextoNaTela(tag, texto) { // Essa função recebe uma tag (como h1 ou p) e um texto para mostrar na tela
   let campo = document.querySelector(tag); // Pega o elemento da tela
   campo.innerHTML = texto; // Coloca o texto dentro da tag
   responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2}) // Fala o texto com voz
}

// Função para exibir o título e a instrução inicial do jogo
function exibirMensagemInicial() {
   exibirTextoNaTela("h1", "Jogo do número secreto")
   exibirTextoNaTela("p", "Escolha um número entre 1 e 10")
}

// Mostra a mensagem assim que a página carregar
exibirMensagemInicial ()

//nao tem parametro e nao tem retorno
function verificarChute() { // Função chamada quando o jogador clica no botão "Chutar"
   let chute = document.querySelector("input").value // Pega o número que o jogador digitou

   // Se o número digitado for igual ao número secreto
   if (chute == numeroSecreto) {
      exibirTextoNaTela("h1", "Acertou!")
      let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa" // Define se a palavra vai ser "tentativa" ou "tentativas"
      let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!` // Monta a frase de sucesso com o número de tentativas
      exibirTextoNaTela("p", mensagemTentativa)
      document.getElementById ("reiniciar").removeAttribute("disabled") // Habilita o botão de "Novo jogo"
   }
   // Se o número estiver errado
   else {
      if (chute > numeroSecreto) {
         exibirTextoNaTela("p", "O número secreto é menor")
      }
      else { 
         exibirTextoNaTela("p", "O número secreto é maior")
      }  

      // Aumenta o número de tentativas e limpa o campo de entrada    
      tentativas++
      limparCampo()
   }
}

//nenhum parametro mas tem retorno
function gerarNumeroAleatorio() { // Gera um número aleatório entre 1 e 10 que ainda não foi sorteado
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1)
   let quantidadeElementosLista = listaNumerosSorteados.length

    // Se já sorteou todos os números possíveis, zera a lista
   if (quantidadeElementosLista == numeroLimite) {
      listaNumerosSorteados = []
   }
   // Se o número já foi sorteado, sorteia outro
   if (listaNumerosSorteados.includes(numeroEscolhido)) {
      return gerarNumeroAleatorio ()
   }
   // Adiciona o número novo na lista e retorna ele
   else {
      listaNumerosSorteados.push(numeroEscolhido)
      return numeroEscolhido
   }
}
// Limpa o campo de input para o jogador digitar outro número
function limparCampo() {
   chute = document.querySelector("input")
   chute.value = ""
}
// Função chamada ao clicar no botão "Novo jogo"
function reiniciarJogo() {
   numeroSecreto = gerarNumeroAleatorio() //gera um novo numero
   limparCampo () // limpa campo de chute
   tentativas = 1 // reinicia as tentativas
   exibirMensagemInicial () //mostra a mensagem inicial dnv
   document.getElementById ("reiniciar").setAttribute('disabled', true) // desativa o botao de "novo jogo"
}

