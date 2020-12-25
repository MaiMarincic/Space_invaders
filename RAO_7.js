class Player {
	constructor(x, y, imageSource){
		this.x = x;
		this.y = y;
		this.ship = new Image();
		this.ship.src = imageSource;
	}
}

class Enemy {
	constructor(x, y, imageSource){
		this.x = x;
		this.y = y;
	}
}

class Bullet{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

let canvas;
let ctx;
let buffer;

let player;
let enemy = [];

let bullets = [];
let l=1;
let m=0;
let n=5;
let h={};
let p=0;

function initBackground(){
	//set backround color of canvas to gray
	ctx.fillStyle = 'silver';
}

function initElements(){
	//create canvas element
	canvas = document.createElement("canvas");

	//set canvas size
	canvas.width = 500;
	canvas.height = 500;

	//get context of canvas
	ctx = canvas.getContext("2d");
	buffer = canvas.getContext("2d");

	//append canvas to body
	document.body.appendChild(canvas)
}

function drawBackground () {
	//decorate your background
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

onkeydown = onkeyup = function(e){
e = e || event;
h[e.keyCode] = e.type == 'keydown';
}

function playerInput () {


	//check for pressed buttons
	//"a"
	if (h[65] && player.x > 25)
		player.x -= 5;

	//"d"
	if (h[68] && player.x < canvas.width -25)
		player.x += 5;

	//"space"
	if (h[32] && p==0) {
		bullets.push(new Bullet(player.x, player.y));
		updateBullets();
		p=30;
	}
	if(p>0)
	p--;
}

function drawPlayer () {
	//draw player spaceship at current location
	buffer.drawImage(player.ship, player.x-20, player.y, 40, 20)
}

function drawEnemy () {
	//draw player spaceship at current location
	if(enemy.length < 9 && l<5)
	{while(enemy.length < 5)
		{
			enemy[enemy.length] = new Enemy(l*70, 100);
			l++;
		}
		if(l>4)
		l=1;
		enemy[enemy.length] = new Enemy((l*70)+25, 150);
		l++;
	}
	//draw all still existing bullets
	for(let i = 0; i < enemy.length; i++){
			buffer.drawImage(enemys, enemy[i].x, enemy[i].y , 40, 20)
	}

	for(let i = 0; i < enemy.length; i++){
			enemy[i].x += m;
			if(enemy[i].x >= 470 || enemy[i].x <= 15)
				{n+=5;
			for(let j = 0; j < enemy.length; j++)
				{enemy[j].y += n;}
				}
	}
	if(n%2==0)
		m=-2;
	else
		m=2;

winlose();
	//update enemy

}

function winlose (){

	for(let i = 0; i < enemy.length; i++)
	{
		if(enemy[i].y >= 500)
		{
			player.x = 250;
			player.y = 250;
		}
	}

	if(enemy.length == 0)
	{
		player.x = 250;
		player.y = 250;
	}

}

function updateBullets () {
	//update all existing bullets
	for(let i = 0; i < bullets.length; i++){
		bullets[i].y -= 3;

		//if bullet is off-screen then remove it from array
		if(bullets[i].y <= 0)
		{bullets.splice(i, 1);}

		else
		for(let j=0;j<enemy.length;j++)
		{if(bullets[i].y <= enemy[j].y + 25 && bullets[i].x <= enemy[j].x + 30 && bullets[i].x >= enemy[j].x)
			{
				enemy.splice(j,1);
				bullets.splice(i, 1);
		}}


		//if bullet hit an enemy remove both the bullet and the enemy
		//detectCollision();
	}
}

function drawBullets () {
	//skips function if no bullets exist
	if(bullets.length == 0)
		return;

	//draw all still existing bullets
	for(let i = 0; i < bullets.length; i++){
		buffer.beginPath();
		buffer.arc(bullets[i].x, bullets[i].y, 2, 0, 2*Math.PI);
		buffer.stroke();
	}

	//update enemy
	updateBullets();
}

function draw () {
	drawBackground();
	drawPlayer();
	drawEnemy();
	drawBullets();
	playerInput();
	//drawEnemies();
	window.requestAnimationFrame(draw);
}

function init () {
	document.addEventListener('keydown', playerInput);
	initElements();
	initBackground();
	player = new Player(canvas.width/2, canvas.height-30, "ship.png");//"https://cdn.onlinewebfonts.com/svg/img_3969.png");
	//foe = new Foe(canvas.width/2, canvas.height-400, "ship.png");//"https://cdn.onlinewebfonts.com/svg/img_3969.png");
	enemys = new Image();
	enemys.src = "ship.png";

	//start game
	draw();
}
