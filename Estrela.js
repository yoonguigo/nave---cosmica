// Estrela coletável que aumenta a pontuação.
class Estrela {
    constructor(x,y){this.x=x;this.y=y;this.tamanho=8;this.velocidade=120+Math.random()*50;this.rotacao=0;}
    atualizar(dt){this.y+=this.velocidade*dt;this.rotacao+=3*dt;}
    desenhar(ctx){
        ctx.save();ctx.translate(this.x,this.y);ctx.rotate(this.rotacao);ctx.fillStyle="#ffe66d";ctx.beginPath();
        for(let i=0;i<10;i++){const r=i%2===0?this.tamanho:this.tamanho*.4,a=-Math.PI/2+i*Math.PI/5,x=Math.cos(a)*r,y=Math.sin(a)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
        ctx.closePath();ctx.fill();ctx.restore();
    }
    saiuDaTela(altura){return this.y>altura+20;}
}
