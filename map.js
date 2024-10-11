// game.js
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false // Désactive le mode debug pour éviter les rectangles noirs
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.RESIZE, // Ajuste automatiquement la taille du canvas
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000' // Optionnel : couleur de fond par défaut
};

const game = new Phaser.Game(config);

let player;
let background;
let cursors;
let platforms;
let enemies;

function preload() {
    // Assurez-vous que le chemin vers votre image de fond est correct
    this.load.image('sky', 'platformer_background_2.png');
    this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
    this.load.image('enemy-left', 'bear_walk_look_left.png');
    this.load.image('enemy-right', 'bear_walk_look_right.png');

    // Ajout des différentes textures du joueur
    this.load.image('player', 'bunny.png'); // Image par défaut
    this.load.image('player-jump', 'bunny_jump.png'); // Image de saut
    this.load.image('player-walk-left', 'bunny_walk_left.png'); // Image pour le mouvement à gauche
    this.load.image('player-walk-right', 'bunny_walk_right.png'); // Image pour le mouvement à droite
}

function create() {
    // Ajouter le fond une seule fois et utiliser `setDisplaySize` pour qu'il prenne tout l'écran
    background = this.add.image(0, 0, 'sky').setOrigin(0, 0);

    background.setDisplaySize(this.scale.width, this.scale.height);
    background.setScrollFactor(0); // S'assurer que le fond ne bouge pas avec la caméra

    // Ajuster le fond lors du redimensionnement de la fenêtre
    this.scale.on('resize', (gameSize) => {
        const width = gameSize.width;
        const height = gameSize.height;
        background.setDisplaySize(width, height);
    });

    // Définir les limites du monde de jeu
    const worldWidth = 2000;
    const worldHeight = 1200;
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // Créer les plateformes statiques
    platforms = this.physics.add.staticGroup();

    // Créer la plateforme principale centrée horizontalement
    platforms.create(worldWidth / 2, worldHeight - 32, 'ground')
        .setScale(10, 2) // Ajuster l'échelle pour couvrir la largeur du monde
        .refreshBody()
        .setDepth(1); // S'assurer que la plateforme est au-dessus du fond



    // Ajouter d'autres plateformes si nécessaire
    platforms.create(600, 400, 'ground').setScale(2, 1).refreshBody().setDepth(1);
    platforms.create(50, 250, 'ground').setScale(2, 1).refreshBody().setDepth(1);
    platforms.create(750, 220, 'ground').setScale(2, 1).refreshBody().setDepth(1);

    // Initialiser le joueur
    player = this.physics.add.sprite(100, worldHeight - 150, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setDepth(2); // S'assurer que le joueur est au-dessus des plateformes

    // Collisions entre le joueur et les plateformes
    this.physics.add.collider(player, platforms);

    // Contrôles du clavier
    cursors = this.input.keyboard.createCursorKeys();

    // Initialiser les ennemis
    enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: { x: 400, y: worldHeight - 150, stepX: 150 }
    });

    enemies.children.iterate(function (enemy) {
        enemy.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        enemy.setCollideWorldBounds(true);
        enemy.setVelocityX(Phaser.Math.Between(-100, 100));
        enemy.setDepth(2); // S'assurer que les ennemis sont au-dessus des plateformes
        if (enemy.body.velocity.x < 0) {
            enemy.setTexture('enemy-left');
        } else if (enemy.body.velocity.x > 0) {
            enemy.setTexture('enemy-right');
        }
    });

    // Collisions entre les ennemis et les plateformes
    this.physics.add.collider(enemies, platforms);

    // Collision entre le joueur et les ennemis
    this.physics.add.collider(player, enemies, hitEnemy, null, this);

    // Faire en sorte que la caméra suive le joueur
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
}

function update() {

    // Background movement
    background.x = (-player.x) * 0.1;
    background.y = (-player.y) * 0.1;

    // Si le joueur se déplace vers la gauche
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.setTexture('player-walk-left'); // Changer l'image du joueur quand il se déplace à gauche
    }
    // Si le joueur se déplace vers la droite
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.setTexture('player-walk-right'); // Changer l'image du joueur quand il se déplace à droite
    }
    // Si le joueur ne se déplace pas
    else {
        player.setVelocityX(0);
        player.setTexture('player'); // Remettre l'image par défaut si le joueur ne se déplace pas
    }

    // Gestion du saut
    if (cursors.up.isDown) {
        player.setTexture('player-jump'); // Changer l'image quand le joueur saute

    }
    if (cursors.up.isDown && player.body.touching.down) {

        player.setVelocityY(-330);
    }
    // else if (player.body.touching.down) {
    //     player.setTexture('player'); // Retourner à l'image de course quand le joueur touche le sol
    // }
}
// parallax.addEventListener("click", () => {
//     console.log(parallax.scrollTop);
//     firstLayer.style.bottom = parallax.scrollTop;
// }

function hitEnemy(player, enemy) {
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver.call(this);
}

function gameOver() {
    const gameOverText = this.add.text(
        this.cameras.main.worldView.x + this.cameras.main.width / 2,
        this.cameras.main.worldView.y + this.cameras.main.height / 2,
        'Game Over!\nAppuyez sur ESPACE pour Recommencer',
        {
            fontSize: '32px',
            fill: '#ff0000',
            align: 'center'
        }
    );
    gameOverText.setOrigin(0.5);
    gameOverText.setDepth(3); // Assurez-vous que le texte est au-dessus de tous les autres éléments

    this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.restart();
    });
}

// Ajuster la taille du jeu lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
