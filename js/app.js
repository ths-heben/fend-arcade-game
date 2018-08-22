// Global Game Variables
const player_start_x = 200;
const player_start_y = 380;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
        ctx.drawImage(Resources.get('images/char-boy.png'), this.x, this.y);
    };

    update() {

    };

    handleInput(key) {
        console.log(key);

        if (key === 'left' && this.x > 0)
            this.x = this.x - 100;
        else if (key === 'right' && this.x < 400)
            this.x = this.x + 100;
        else if (key === 'up' && this.y > 60)
            this.y = this.y - 80;
        else if (key === 'down' && this.y < 380)
            this.y = this.y + 80;
        else
            console.error('This key cannot be used for playing');

        console.log('x = ' + this.x);
        console.log('y = ' + this.y);
    };
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy()
];

// Initial player with start position
let player = new Player(player_start_x, player_start_y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
