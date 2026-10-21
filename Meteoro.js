// Meteoro que cai em direção à nave.
class Meteoro {
    constructor(x,y,raio,velocidade){this.x=x;this.y=y;this.raio=raio;this.velocidade=velocidade;this.rotacao=Math.random()*Math.PI;this.velocidadeRotacao=(Math.random()-.5)*3;}
    atualizar(dt){this.y+=this.velocidade*dt;this.rotacao+=this.velocidadeRotacao*dt;}
    desenhar(ctx){
        ctx.save();ctx.translate(this.x,this.y);ctx.rotate(this.rotacao);ctx.fillStyle="#8b7d76";ctx.beginPath();
        for(let i=0;i<8;i++){const a=i*Math.PI/4,r=this.raio*(.8+(i%3)*.08),x=Math.cos(a)*r,y=Math.sin(a)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
        ctx.closePath();ctx.fill();ctx.fillStyle="#625752";ctx.beginPath();ctx.arc(-this.raio*.25,-this.raio*.15,this.raio*.18,0,Math.PI*2);ctx.arc(this.raio*.25,this.raio*.2,this.raio*.13,0,Math.PI*2);ctx.fill();ctx.restore();
    }
    saiuDaTela(altura){return this.y>altura+this.raio;}
}
