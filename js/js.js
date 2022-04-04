function start() { 
    // Quando a função start for chamada a div início será oculta
    // e serão criadas essas 4 divs abaixo.
	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador'></div>");
	$("#fundoGame").append("<div id='inimigo1'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo'></div>");
} 
