function start() { 
    // Quando a função start for chamada a div início será oculta
    // e serão criadas essas 4 divs abaixo.
	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador'class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1'class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo'class='anima3'></div>");

	
	//Principais variáveis do jogo:
	
	var podeAtirar=true;
	var jogo = {}
	var TECLA = {
		// Valor decimal de cada tecla.
		W: 87, 
		S: 83,
		D: 68
	}

	var velocidade=5;
	
	// Cria uma posição aleatória para o helicóptero inimigo.
	var posicaoY = parseInt(Math.random() * 334);
	
	jogo.pressionou = [];

	//Verifica se o usuário pressionou alguma tecla.	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
	
	// Não existe tecla pressionada.
	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});
		
	//Game Loop
	jogo.timer = setInterval(loop,30);

	function loop() {
		movefundo();
		movejogador();
		moveinimigo1();
		moveinimigo2();
		moveamigo();
		colisao();
	} 

	//Função que movimenta o fundo do jogo.
	function movefundo() {
		// Pega o valor atual do fundo da div. 
		// Por pradrão a posiciao inicial é 0.
		esquerda = parseInt($("#fundoGame").css("background-position"));
		// Vai andar um pixel para a esquerda.
		$("#fundoGame").css("background-position",esquerda-1);
	} 

	function movejogador() {
		if (jogo.pressionou[TECLA.W]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo-10);

			// Se o topo for <= 0 vamos somar e não subtrair, dessa forma,
			// o jogador vai ficar preso lá em cima.
			if (topo<=0) {
				$("#jogador").css("top",topo+10);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo+10);
			
			// Se for >= 434 vai subtrair ao invés de somar.
			if (topo>=434) {	
				$("#jogador").css("top",topo-10);	
			}	
		}
		
		if (jogo.pressionou[TECLA.D]) {
			//Chama função Disparo.
			disparo();	
		}
	} 	

	function moveinimigo1() {
		//Posição da div inimigo1.
		posicaoX = parseInt($("#inimigo1").css("left"));
		// Atualiza a posição left da div inimigo1 que vai
		// receber a posiçãox - velocidade (variável que vale 5).
		$("#inimigo1").css("left",posicaoX-velocidade);
		// A posiçãoy é um valor randômico, por isso
		// o helicóptero vai aparecer em locais diferêntes.
		$("#inimigo1").css("top",posicaoY);
		
		// Quando o helicóptero chega na esquerda ele reaparece
		// do lado direito. 
		if (posicaoX<=0) {
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);	
		}
	}

	function moveinimigo2() {
    	posicaoX = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left",posicaoX-3);
		
		// Reposiciona o inimigo2 do lado direito da div.
		if (posicaoX<=0) {
			$("#inimigo2").css("left",775);			
		}
	}

	function moveamigo() {
		posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left",posicaoX+1);
					
		if (posicaoX>906) {
			$("#amigo").css("left",0);		
		}
	}

	function disparo() {
		if (podeAtirar==true) {	
		// Para que não possa realizar um novo tiro enquanto
		// essa função estiver em execução.
		podeAtirar=false;
		topo = parseInt($("#jogador").css("top"))
		posicaoX= parseInt($("#jogador").css("left"))
	
		// Soma esses valores à posição do helicóptero para o tiro 
		// não sair de dentro do helicóptero.
		tiroX = posicaoX + 190;
		topoTiro=topo+37;
		$("#fundoGame").append("<div id='disparo'></div");
		$("#disparo").css("top",topoTiro);
		$("#disparo").css("left",tiroX);
		var tempoDisparo=window.setInterval(executaDisparo, 30);
		
		}
	 
		function executaDisparo() {
			posicaoX = parseInt($("#disparo").css("left"));
			$("#disparo").css("left",posicaoX+15); 
			
			// Se o disparo chegar no final da tela:
			if (posicaoX>900) {	
				
				// Remove a variável de tempo.
				window.clearInterval(tempoDisparo);
				// Zera o disparo.
				tempoDisparo=null;
				// Remove o disparo da tela.
				$("#disparo").remove();
				// O usuário pode atirar novamente.
				podeAtirar=true;	
			}
		}

		
	} 	


	// Utiliza o JQ colision.
	function colisao() {
		var colisao1 = ($("#jogador").collision($("#inimigo1")));
		
		// jogador com o inimigo1.
		// Caso a variável colisao1 não esteja vazia.
		if (colisao1.length>0) {
	
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X,inimigo1Y);
			
			// Reposiciona inimigo1.
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
		}
	} 

	//Explosão 1
	function explosao1(inimigo1X,inimigo1Y) {
		$("#fundoGame").append("<div id='explosao1'></div");
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		var div=$("#explosao1");
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		div.animate({width:200, opacity:0}, "slow");
		
		var tempoExplosao=window.setInterval(removeExplosao, 1000);
		
		function removeExplosao() {
			
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;
			
		}
			
	} 
} 

