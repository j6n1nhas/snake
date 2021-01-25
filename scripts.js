let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let cobra = [];
cobra[0] = {x: 8*box, y: 8*box};
let direcao = "direita";
let comida = {x: Math.floor(Math.random()*15+1)*box, y: Math.floor(Math.random()*15+1)*box}
// Função para criar o tabuleiro de jogo
function criarBG()
{
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}
// Função para criar a cobra
function criarCobra()
{
    for(i=0; i<cobra.length; i++)
    {
        context.fillStyle = 'brown';
        context.fillRect(cobra[i].x, cobra[i].y, box, box);
    }
}
// Função para desenhar a comida
function desenhaComida()
{
    context.fillStyle = 'red';
    context.fillRect(comida.x, comida.y, box, box);
}
// Função para controlar o jogo
function iniciarJogo()
{
    if(cobra[0].x > 16*box && direcao == 'direita')
        cobra[0].x = 0;
    if(cobra[0].x < 0 && direcao == 'esquerda')
        cobra[0].x = 16*box;
    if(cobra[0].y > 16*box && direcao == 'abaixo')
        cobra[0].y = 0;
    if(cobra[0].y < 0 && direcao == 'acima')
        cobra[0].y = 16*box;
    for(i=1; i<cobra.length; i++)
    {
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y)
        {
            clearInterval(jogo);
            alert('Game over!');
        }
    }
    criarBG();
    criarCobra();
    desenhaComida();
    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;
    if(direcao == 'direita')
        cobraX += box;
    if(direcao == 'esquerda')
        cobraX -= box;
    if(direcao == 'abaixo')
        cobraY += box;
    if(direcao == 'acima')
        cobraY -= box;
    if(cobraX != comida.x || cobraY != comida.y)
        cobra.pop();
    else
    {
        comida.x = Math.floor(Math.random()*15+1)*box;
        comida.y = Math.floor(Math.random()*15+1)*box;
    }
    let novaCabeca = {x: cobraX, y: cobraY};
    cobra.unshift(novaCabeca);
}
function update(event)
{
    if(event.keyCode == 37 && direcao != 'direita')
        direcao = 'esquerda';
    if(event.keyCode == 38 && direcao != 'abaixo')
        direcao = 'acima';
    if(event.keyCode == 39 && direcao != 'esquerda')
        direcao = 'direita';
    if(event.keyCode == 40 && direcao != 'acima')
        direcao = 'abaixo';
}
let jogo = setInterval(iniciarJogo, 100);
document.addEventListener('keydown', update);