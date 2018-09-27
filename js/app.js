// Global Game Variables
const player_start_x = 200;
const player_start_y = 380;

const player_character = 'images/char-boy.png';

const enemy_start_x = -200; // Use -200 for smooth looking
const max_field_x = 600;  // Use 600 not 400 for smooth looking

const speeds = [430, 400, 280, 320, 370, 290, 320, 340];

const positioning_y = [60, 140, 220];

let score = 0;
let level = 0;
const lives = 3;

// TODO: Add Superclass Character for Enemy and Player

// Enemies our player must avoid
let Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = enemy_start_x;
    this.y = y;
    //const speeds = [speed];
    this.speed = speeds[Math.floor(Math.random() * speeds.length)];
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Reset Enemy's position when they are leaving the field
    if (this.x > max_field_x)
        this.x = enemy_start_x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    render() {
        ctx.drawImage(Resources.get(player_character), this.x, this.y);
    };

    update() {
        // Jump into water and win the game
        if (this.y <= 0) {
            score++;

            // Level up at score of 5
            if (score % 5 === 0) {
                level++;
                // New level new enemy
                allEnemies.push(new Enemy(positioning_y[Math.floor(Math.random() * positioning_y.length)]));
                $('#level').text(level);
            }

            $('#score').text(score);

            // Back to start
            this.resetPosition();
        }
    };

    handleInput(key) {
        console.log(key);

        if (key === 'left' && this.x > 0)
            this.x = this.x - 100;
        else if (key === 'right' && this.x < 400)
            this.x = this.x + 100;
        else if (key === 'up' && this.y > 0)
            this.y = this.y - 80;
        else if (key === 'down' && this.y < 380)
            this.y = this.y + 80;
        else
            console.error('This key cannot be used for playing');

        console.log('x = ' + this.x);
        console.log('y = ' + this.y);
    };

    resetPosition() {
        this.x = player_start_x;
        this.y = player_start_y;
    };
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(60),
    new Enemy(140),
    new Enemy(220)
];

// Place the player object in a variable called player
// Initial player with start position
let player = new Player(player_start_x, player_start_y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function checkCollisions() {
    for (let enemy of allEnemies) {
        if (enemy.x >= player.x - 60 && enemy.x <= player.x + 60 && enemy.y === player.y) {
            $('#lives img').first().remove();

            let currentLives = $('#lives img').length;
            console.log('Current lives: ' + currentLives);
            if (currentLives === 0) {
                gameOver();
            }
            else
                player.resetPosition();
        }
    }
}

for (let i = 0; i < lives; i++) {
    $('#lives').append('<img src="' + player_character + '" height="80px">');
}

function gameOver() {
    player.resetPosition();
    $('.restart-overlay').toggle();
    $('#scoreResult').append(score);
    $('#restart-button').click(function() {
        window.location.reload(true);
    });
}

