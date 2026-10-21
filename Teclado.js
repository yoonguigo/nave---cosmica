// Lê as teclas pressionadas e avisa quando uma tecla é apertada.
class Teclado {
    constructor(aoApertar) {
        this.teclas = {};
        document.addEventListener("keydown", e => {
            this.teclas[e.code] = true;
            if (["ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
            if (!e.repeat) aoApertar(e.code);
        });
        document.addEventListener("keyup", e => this.teclas[e.code] = false);
    }
    pressionada(tecla) { return Boolean(this.teclas[tecla]); }
}
