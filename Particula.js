// Partículas simples para o efeito de explosão.
class Particula {
    constructor(x,y){const a=Math.random()*Math.PI*2,v=40+Math.random()*130;this.x=x;this.y=y;this.vx=Math.cos(a)*v;this.vy=Math.sin(a)*v;this.vida=.35+Math.random()*.45;this.tamanho=2+Math.random()*3;}
    atualizar(dt){this.x+=this.vx*dt;this.y+=this.vy*dt;this.vida-=dt;}
    desenhar(ctx){ctx.globalAlpha=Math.max(0,this.vida);ctx.fillStyle="#ffcf5c";ctx.fillRect(this.x,this.y,this.tamanho,this.tamanho);ctx.globalAlpha=1;}
    acabou(){return this.vida<=0;}
}
