// Um tiro disparado pela nave.
class Tiro {
    constructor(x,y){this.x=x;this.y=y;this.largura=4;this.altura=13;this.velocidade=430;}
    atualizar(dt){this.y-=this.velocidade*dt;}
    desenhar(ctx){ctx.fillStyle="#7ee7ff";ctx.shadowColor="#7ee7ff";ctx.shadowBlur=8;ctx.fillRect(this.x-this.largura/2,this.y,this.largura,this.altura);ctx.shadowBlur=0;}
    saiuDaTela(){return this.y < -20;}
}
