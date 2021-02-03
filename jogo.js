console.log('[vinicius.p.s] Flappy Bird')
let frame = 0
const sprites = new Image();
sprites.src = './sprites.png';

const som_HIT = new Audio()
som_HIT.src = './efeitos/hit.wav'

const som_pulo = new Audio()
som_pulo.src = './efeitos/pulo.wav'

const som_caiu = new Audio()
som_caiu.src = './efeitos/caiu.wav'

const som_ponto = new Audio()
som_ponto.src = './efeitos/ponto.wav'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext("2d");

let ganhou = 0

let mais_cem = 100  
const planoDeFundo = {
    spriteX: 113,
    spriteY: 371,
    largura: 440    ,
    altura: 204,
    x: 0,
    y: canvas.height -205 ,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)  

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //spite x e sprite y
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do recorte na sprite
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura)
    }
}    

const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) -174 / 2,
    y: 50,
    desenha() {

        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY, //spite x e sprite y
            mensagemGetReady.largura, mensagemGetReady.altura, //tamanho do recorte na sprite
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura)
    }
}

const mensagemGameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {

        contexto.drawImage(
            sprites,
            mensagemGameOver.spriteX, mensagemGameOver.spriteY, //spite x e sprite y
            mensagemGameOver.largura, mensagemGameOver.altura, //tamanho do recorte na sprite
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.largura, mensagemGameOver.altura)
    }
}

function fazColisao(flappyBird, chao ) {
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y
    
    if (flappyBirdY >= chaoY) {
        return true
    }
    
    return false
}

function cria_chao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 666,
        altura: 112,
        x: 0,
        y: canvas.height - 112,

        atualiza(){
            const movimentoDoChao = 1
            const repeteEm = 112
            const movimentaçao = chao.x - movimentoDoChao
            chao.x = movimentaçao % repeteEm


        },


        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY, //spite x e sprite y
                chao.largura, chao.altura, //tamanho do recorte na sprite
                chao.x, chao.y,
                chao.largura, chao.altura)
        }
    } 
    return chao   
}

function criaFlappyBird() {
    const flappyBird = {
        
        largura: 34,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo

        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
                som_HIT.play()
                
                mudaParaTela(telas.GAME_OVER)

                return
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade

        },
        movimentos:[
            { spriteX: 0, spriteY: 26 },//asa meio 
            { spriteX: 0, spriteY: 0 },//asa cima
            { spriteX: 0, spriteY: 26 },//asa meio 
            { spriteX: 0, spriteY: 52 },//asa baixo
        ],

        frameAtual: 0,
        atualizaoFrameAtual() {
            const intervaloDeFrames = 6 
            const passouIntervalo = frame % intervaloDeFrames === 0
            if (passouIntervalo) {
                const baseDoIncremento = 1
                const incremento = baseDoIncremento + flappyBird.frameAtual
                const baseRepeticao = flappyBird.movimentos.length
                flappyBird.frameAtual = incremento % baseRepeticao
                
            }
        },
        desenha() {
            flappyBird.atualizaoFrameAtual() 
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual]

            contexto.drawImage(
                sprites,
                spriteX, spriteY, //spite x e sprite y
                flappyBird.largura, flappyBird.altura, //tamanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura)
        },
       
    } 
    return flappyBird;
}
 
function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169
        },
        ceu: {
            spriteX: 52,
            spriteY: 169
        },
        espaco: 80,
        desenha() {
            
            canos.pares.forEach(function(par) {
                const Yrandom = par.y
                const espacamentoEntreCanos = 90
    
                const canoCeuX = par.x
                const canoCeuY = Yrandom
                
                // cano do ceu
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
    
                // cano do chao
                const canoChaoX = par.x
                const canoChaoY = canos.altura + espacamentoEntreCanos + Yrandom
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }

                
            })
        },
        temColissaoComFlappy(par){
            const cabecaDoFlappy = globais.flappyBird.y
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura

            if ((globais.flappyBird.x  + globais.flappyBird.largura - 5) >= par.x) {
                
                
                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true
                }

                if (peDoFlappy >= par.canoChao.y) {
                    return true
                }
            }

            return false
        },
        pares: [{
           
        }],
        atualiza(){
            const passou100frames = frame % 100 === 0 
            if(passou100frames){
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                })
            }


            canos.pares.forEach(function (par) {
                par.x = par.x - 2

                if (canos.temColissaoComFlappy(par)) {
                    mudaParaTela(telas.GAME_OVER)
                    som_HIT.play()
                }

                if(par.x + canos.largura <= 0 ){
                    canos.pares.shift()
                }
            })
        }

    }
    return canos
}

const medalha = {
    largura: 44,
    altura: 44,
    x: 104, 
    y: 136,
    medalhas: [
        { spriteX: 0, spriteY: 78 },//medalha branca
        { spriteX: 48, spriteY: 124 },//medalha de bronze
        { spriteX: 48, spriteY: 78 },//medalha de prata
        { spriteX: 0, spriteY: 124 },//medalha de ouro
    ],


    desenha() {
        const { spriteX, spriteY } = medalha.medalhas[ganhou]

        contexto.drawImage(
            sprites,
            spriteX, spriteY, //spite x e sprite y
            medalha.largura, medalha.altura, //tamanho do recorte na sprite
            medalha.x, medalha.y,
            medalha.largura, medalha.altura)
    },
}

function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha(){
            contexto.font = '35px "VT323"'
            contexto.textAlign = "right"
            contexto.fillStyle = 'white'
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 5, 35)
            placar.pontuacao
        },
        final(){
            contexto.font = '35px "VT323"'
            contexto.fillStyle = '#d7a84c'
            contexto.fillText(`${placar.pontuacao}`, 270 , 168)
            placar.pontuacao
        },
        atualiza(){
            const intervaloDeFrames = 25
            const passouIntervalo = frame % intervaloDeFrames === 0
            

            if(passouIntervalo){
                placar.pontuacao++
                if (placar.pontuacao == mais_cem){
                    som_ponto.play
                    mais_cem = mais_cem + 100
                    console.log('[mais100]=',mais_cem)
                    som_ponto.play()
                    
                }
                if (placar.pontuacao <= 50) {
                    ganhou = 0
                    console.log('[ganhou]', ganhou)
                }else if (placar.pontuacao >= 100 && ganhou == 0) {
                    ganhou = 1
                    console.log('[ganhou]', ganhou)
                }
                else if (placar.pontuacao >= 250 && ganhou == 1) {
                    ganhou = 2
                    console.log('[ganhou]', ganhou)
                }
                else if (placar.pontuacao >= 500 && ganhou == 2) {
                    ganhou = 3
                    console.log('[ganhou]', ganhou)
                }
                }
                
            }
            
           

        }
    return placar
}
  
   
// telas

let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela
    if (telaAtiva.inicializa) {
        telas.INICIO.inicializa()
    }

    
}
const globais = {}
const telas = {
    INICIO: {
        inicializa(){
            globais.flappyBird = criaFlappyBird();
            globais.cano  = criaCanos()
            globais.chao = cria_chao();
            globais.placar = criaPlacar()
        },

        desenha(){
            planoDeFundo.desenha()
            globais.flappyBird.desenha()
            globais.chao.desenha()
            mensagemGetReady.desenha()
        },
        click() {
            mudaParaTela(telas.JOGO)
        },

        atualiza(){
            globais.chao.atualiza()
            
        }
    }
};

telas.JOGO = {
    inicializa() {
        globais.placar = criaPlacar()
    },
    desenha(){
        planoDeFundo.desenha()
        globais.cano.desenha()
        globais.chao.desenha()
        globais.flappyBird.desenha() 
        globais.placar.desenha()
    },
    click() {
        globais.flappyBird.pula()
        som_pulo.play()
    },
    atualiza() {
        globais.cano.atualiza()
        globais.chao.atualiza()
        globais.flappyBird.atualiza()
        globais.placar.atualiza()


    }
}

telas.GAME_OVER = {
    desenha(){
        mensagemGameOver.desenha()
        medalha.desenha()
        globais.placar.final()
    },
    atualiza(){

    },
    click(){
        mudaParaTela(telas.INICIO)
    },
}

function loop() {

    telaAtiva.desenha()
    telaAtiva.atualiza()
    frame = frame +1
    requestAnimationFrame(loop);

}
window.addEventListener('click', function() {
    if (telaAtiva.click ) {
        telaAtiva.click();
    }
});


mudaParaTela(telas.INICIO)

loop();
