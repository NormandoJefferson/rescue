function start() { 
    // Quando a função start for chamada a div início será oculta
    // e serão criadas essas 4 divs abaixo.
	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador'class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1'class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo'class='anima3'></div>");

	
	//Principais variáveis do jogo:
	var jogo = {}
	var TECLA = {
		// Valor decimal de cada tecla.
		W: 87, 
		S: 83,
		D: 68
	}
	
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
		}
		
		if (jogo.pressionou[TECLA.S]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo+10);	
		}
		
		if (jogo.pressionou[TECLA.D]) {
			
			//Chama função Disparo	
		}
	} 	
} 
