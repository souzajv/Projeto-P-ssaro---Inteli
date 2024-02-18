//configurações do phaser, e de como irá ser as dimensões do jogo.
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

//váriaveis declaradas
var game = new Phaser.Game(config);
var passarinho;
var ida = true; // Inicializando a propriedade ida

//carregamentos das imagens e objetos que iremos utilizar no jogo.
function preload() {
    this.load.image('bg', 'assets/bg_space.png');
    this.load.spritesheet('bird','assets/bird-purple.png', {frameWidth: 75, frameHeight: 75});
}

//configurações de como as imagens e objetos irão se comportar.
function create() {
    this.add.image(400, 300, 'bg').setScale(1.2);
    passarinho = this.add.sprite(100,300, 'bird').setScale(1.3);
    //configurando a animação da sprite
    this.anims.create({
        //nome da animação.
        key:'fly',
        //definimos quantas sprites vão ser utilizadas na animação, declarando de a partir de qual sprite irá começar e terminar essa animação.
        frames: this.anims.generateFrameNumbers('bird', { start:0, end:7 }),
        //definimos a velocidade dessa animação
        frameRate: 15,
        //quantas vezes essa animação irá rodar, nesse caso, infinitamente.
        repeat: -1
    });
    //ativamos a animação configurada previamente.
    passarinho.anims.play('fly', true);

    // Adicionando uma propriedade personalizada para controlar o movimento vertical
    passarinho.velocidadeY = 1;
}

//atualizações e movimentações que vamos querer para as imagens pré-carregadas anteriormente. 
function update() { 
    // movimento horizontal do passarinho.
    if (passarinho.x === 100) {
        passarinho.setFlip(false, false);
        ida = true; // Iniciando o movimento para a direita
    }
    
    if (passarinho.x < 700 && ida === true) {
        console.log("o passarinho irá voar para a direita, pois o seu ponto de partida (X) é menor que 700");
        passarinho.x += 5;
    }
    
    //ao chegar no ponto X 700, a imagem do nosso passarinho irá se orientar para outro lado.
    if (Math.abs(passarinho.x - 700) < 5) {
        passarinho.setFlip(true, false);
        ida = false; // Iniciando o movimento para a esquerda
    }

    if (passarinho.x > 100 && ida === false) {
        console.log("o passarinho irá voar para a esquerda, pois o seu ponto de partida (X) é maior que 100");
        passarinho.x -= 5;
    }
    
    //movimento vertical do passarinho.
    passarinho.y += passarinho.velocidadeY;

    //se o passarinho atingir o limite superior ou inferior, inverte a direção.
    if (passarinho.y <= 50 || passarinho.y >= 550) {
        passarinho.velocidadeY *= -1;
    }
}
