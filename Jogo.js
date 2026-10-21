// Arquivo principal: conecta as classes e controla a partida.

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const telaInicial = document.getElementById("startScreen");
const telaFim = document.getElementById("gameOverScreen");
const botaoIniciar = document.getElementById("startButton");
const botaoReiniciar = document.getElementById("restartButton");
const textoFinal = document.getElementById("finalScore");

let teclado, nave, tiros=[], meteoros=[], estrelas=[], particulas=[];
let pontuacao=0, vidas=3, rodando=false, pausado=false;
let ultimoTempo=0, tempoMeteoro=0, tempoEstrela=0, tempoDificuldade=0;
let intervaloMeteoro=900, idAnimacao;

function iniciarJogo(){
    pontuacao=0; vidas=3; tempoMeteoro=0; tempoEstrela=0;
    tempoDificuldade=0; intervaloMeteoro=900;
    tiros=[]; meteoros=[]; estrelas=[]; particulas=[];
    nave=new Nave(canvas.width/2,445);
    if (!teclado) teclado=new Teclado(tratarTecla);
    telaInicial.classList.add("hidden");
    telaFim.classList.add("hidden");
    rodando=true; pausado=false; ultimoTempo=performance.now();
    cancelAnimationFrame(idAnimacao);
    idAnimacao=requestAnimationFrame(cicloDoJogo);
}

function tratarTecla(tecla){
    if(tecla==="Space" && rodando && !pausado) tiros.push(new Tiro(nave.x,nave.y-22));
    if(tecla==="Enter" && rodando) pausado=!pausado;
}

function cicloDoJogo(tempo){
    if(!rodando)return;
    const dt=Math.min((tempo-ultimoTempo)/1000,.05);
    ultimoTempo=tempo;
    if(!pausado)atualizar(dt);
    desenhar();
    idAnimacao=requestAnimationFrame(cicloDoJogo);
}

function atualizar(dt){
    nave.atualizar(dt,teclado,canvas.width);
    tempoMeteoro+=dt*1000; tempoEstrela+=dt*1000; tempoDificuldade+=dt*1000;
    if(tempoMeteoro>=intervaloMeteoro){criarMeteoro();tempoMeteoro=0;}
    if(tempoEstrela>=1600){criarEstrela();tempoEstrela=0;}
    if(tempoDificuldade>=5000){intervaloMeteoro=Math.max(350,intervaloMeteoro-50);tempoDificuldade=0;}

    atualizarLista(tiros,dt,obj=>obj.saiuDaTela());
    atualizarLista(meteoros,dt,obj=>obj.saiuDaTela(canvas.height));
    atualizarLista(estrelas,dt,obj=>obj.saiuDaTela(canvas.height));
    atualizarLista(particulas,dt,obj=>obj.acabou());
    verificarColisoes();
}

function atualizarLista(lista,dt,remover){
    for(let i=lista.length-1;i>=0;i--){lista[i].atualizar(dt);if(remover(lista[i]))lista.splice(i,1);}
}

function criarMeteoro(){
    const raio=22+Math.random()*22;
    const x=raio+Math.random()*(canvas.width-raio*2);
    const velocidade=100+Math.random()*90+(900-intervaloMeteoro)*.12;
    meteoros.push(new Meteoro(x,-raio,raio,velocidade));
}

function criarEstrela(){
    estrelas.push(new Estrela(18+Math.random()*(canvas.width-36),-15));
}

function verificarColisoes(){
    // Tiros contra meteoros.
    for(let i=meteoros.length-1;i>=0;i--){
        const m=meteoros[i];
        for(let j=tiros.length-1;j>=0;j--){
            const t=tiros[j];
            if(colisaoCirculoRetangulo(m.x,m.y,m.raio,{x:t.x-t.largura/2,y:t.y,width:t.largura,height:t.altura})){
                criarParticulas(m.x,m.y,20);meteoros.splice(i,1);tiros.splice(j,1);pontuacao+=10;break;
            }
        }
    }

    // Meteoro contra nave.
    if(nave.invencivel<=0){
        for(let i=meteoros.length-1;i>=0;i--){
            const m=meteoros[i];
            const r={x:nave.x-nave.largura/2,y:nave.y-nave.altura/2,width:nave.largura,height:nave.altura};
            if(colisaoCirculoRetangulo(m.x,m.y,m.raio,r)){
                meteoros.splice(i,1);vidas--;nave.invencivel=1.2;criarParticulas(nave.x,nave.y,20);
                if(vidas<=0)encerrarJogo();
                break;
            }
        }
    }

    // Nave coletando estrelas.
    for(let i=estrelas.length-1;i>=0;i--){
        const e=estrelas[i];
        if(Math.abs(e.x-nave.x)<25 && Math.abs(e.y-nave.y)<30){
            estrelas.splice(i,1);pontuacao+=25;criarParticulas(e.x,e.y,12);
        }
    }
}

function colisaoCirculoRetangulo(cx,cy,raio,r){
    const x=Math.max(r.x,Math.min(cx,r.x+r.width));
    const y=Math.max(r.y,Math.min(cy,r.y+r.height));
    const dx=cx-x,dy=cy-y;
    return dx*dx+dy*dy<raio*raio;
}

function criarParticulas(x,y,quantidade){
    for(let i=0;i<quantidade;i++)particulas.push(new Particula(x,y));
}

function encerrarJogo(){
    rodando=false;
    textoFinal.textContent="Pontuação: "+pontuacao;
    telaFim.classList.remove("hidden");
}

function desenhar(){
    desenharFundo();
    estrelas.forEach(e=>e.desenhar(ctx));
    meteoros.forEach(m=>m.desenhar(ctx));
    tiros.forEach(t=>t.desenhar(ctx));
    nave.desenhar(ctx);
    particulas.forEach(p=>p.desenhar(ctx));
    ctx.fillStyle="#fff";ctx.font="bold 18px Arial";
    ctx.textAlign="left";ctx.fillText("Pontos: "+pontuacao,15,25);
    ctx.textAlign="right";ctx.fillText("Vidas: "+"♥".repeat(vidas),canvas.width-15,25);

    if(pausado){
        ctx.fillStyle="rgba(0,0,0,.6)";ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="#fff";ctx.textAlign="center";ctx.font="bold 42px Arial";
        ctx.fillText("PAUSADO",canvas.width/2,canvas.height/2);
        ctx.font="16px Arial";ctx.fillText("Pressione ENTER para continuar",canvas.width/2,canvas.height/2+35);
    }
}

function desenharFundo(){
    const gradiente=ctx.createLinearGradient(0,0,0,canvas.height);
    gradiente.addColorStop(0,"#050817");gradiente.addColorStop(1,"#111936");
    ctx.fillStyle=gradiente;ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#fff";
    for(let i=0;i<55;i++){
        const x=(i*97)%canvas.width;
        const y=(i*53+performance.now()*.025)%canvas.height;
        const tamanho=i%4===0?2:1;
        ctx.fillRect(x,y,tamanho,tamanho);
    }
}

botaoIniciar.addEventListener("click",iniciarJogo);
botaoReiniciar.addEventListener("click",iniciarJogo);
