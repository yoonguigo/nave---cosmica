// Controla a posição, o movimento e o desenho da nave.
class Nave {
    constructor(x, y) {
        this.x=x; this.y=y; this.largura=34; this.altura=42;
        this.velocidade=300; this.invencivel=0;
    }
    atualizar(dt, teclado, larguraTela) {
        if (teclado.pressionada("ArrowLeft")) this.x -= this.velocidade*dt;
        if (teclado.pressionada("ArrowRight")) this.x += this.velocidade*dt;
        this.x=Math.max(this.largura/2,Math.min(larguraTela-this.largura/2,this.x));
        if(this.invencivel>0) this.invencivel-=dt;
    }
    desenhar(ctx) {
        if(this.invencivel>0 && Math.floor(this.invencivel*10)%2===0) return;
        ctx.save(); ctx.translate(this.x,this.y);
        ctx.fillStyle="#ff9f43";ctx.beginPath();ctx.moveTo(-7,15);ctx.lineTo(0,30+Math.random()*4);ctx.lineTo(7,15);ctx.fill();
        ctx.fillStyle="#dfe7ff";ctx.beginPath();ctx.moveTo(0,-22);ctx.lineTo(17,19);ctx.lineTo(7,14);ctx.lineTo(0,19);ctx.lineTo(-7,14);ctx.lineTo(-17,19);ctx.closePath();ctx.fill();
        ctx.fillStyle="#5cc8ff";ctx.beginPath();ctx.ellipse(0,-7,6,9,0,0,Math.PI*2);ctx.fill();
        ctx.fillStyle="#8c9cff";ctx.fillRect(-17,10,10,5);ctx.fillRect(7,10,10,5);ctx.restore();
    }
}
