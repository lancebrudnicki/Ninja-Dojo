
let health = document.getElementById("health");
var score =0;
var hero = {
    x: 250,
    y: 450,
}
var enemies = [{x:50, y:40},{x:250,y:30},{x:450,y:70},{x:390,y:80},{x:370,y:30},{x:300,y:100},{x:290,y:50},
            {x:50, y:120},{x:250,y:10},{x:90,y:110},{x:350,y:50},{x:210,y:50},{x:450,y:50},{x:150,y:50}];
var bombers = [{x:70, y:50},{x:200,y:50},{x:400,y:50}];

var explosion = [];
var bullets =[];

function displayhero(){
    document.getElementById('hero').style['top'] = hero.y + "px";
    document.getElementById('hero').style['left'] = hero.x + "px";
}


function displayEnemies(){
    var output = '';
    for(var i=0; i<enemies.length; i++){
        output += "<div class='enemy1' style='top:"+enemies[i].y+"px; left:"+enemies[i].x+"px;'></div>";
    }
    
    document.getElementById('enemies').innerHTML = output;
}
function displayBombers(){
    var output = ''; 
    for(var i=0; i<bombers.length; i++){
        output += "<div class='enemy2' style='top:"+bombers[i].y+"px; left:"+bombers[i].x+"px;'></div>";
    }
    document.getElementById('bombers').innerHTML = output;
}
function displayExplosion(){
    var output = '';
    for(var i=0; i<explosion.length; i++){
        output += "<div class='explosion' style='top:"+(explosion[i].y-5)+"px; left:"+(explosion[i].x-13)+"px;'></div>";
        explosion[i].frames--;
        console.log(explosion[i].frames)
        if(explosion[i].frames == 0){
            explosion[i] = explosion[explosion.length-1];
            explosion.pop();
        }
        
    }
    document.getElementById('explosion').innerHTML = output;
}

function moveEnemies(){
    for(var i=0; i<enemies.length; i++){
        enemies[i].y += 5;
        if(enemies[i].y > 500){
            enemies[i].y = 0;
            enemies[i].x =Math.random()*500;
        }
    }
}
function moveBombers(){
    for(var i=0; i<bombers.length; i++){
        bombers[i].y += 3;
        if(bombers[i].y > 495){
            bombers[i].y = 0;
            bombers[i].x =Math.random()*495;
        }
    }
}
function moveBullets(){
    for(var i=0; i<bullets.length; i++){
        bullets[i].y += -5;
        if(bullets[i].y < 0){
            bullets[i] = bullets[bullets.length-1];
            bullets.pop();
        }
    }
}
function detectCollision(){
    for(var i=0; i<bullets.length; i++){
        for(var j=0; j<enemies.length; j++){
            if( Math.abs(bullets[i].x - enemies[j].x) < 15 && Math.abs(bullets[i].y - enemies[j].y) < 15)
            {
            enemies[j].x = Math.random()*500;
            enemies[j].y = 0;
            explosion.push({x:bullets[i].x, y:bullets[i].y, frames:5});
            bullets[i]= bullets.length-1;
            bullets.pop([i]);
            document.getElementById("loveit").load();
            document.getElementById("loveit").play();
            score += 10;
        }
        }
    }
}
function detectCollision2(){
    for(var i=0; i<bullets.length; i++){
        for(var j=0; j<bombers.length; j++){
            if( Math.abs(bullets[i].x - bombers[j].x) < 56 && Math.abs(bullets[i].y - bombers[j].y) < 56)
            {
                bombers[j].x = Math.random()*490;
                bombers[j].y = 0;
                explosion.push({x:bullets[i].x, y:bullets[i].y, frames:5});
                bullets[i]= bullets.length-1;
                bullets.pop([i]);
                document.getElementById("loveit").load();
                document.getElementById("loveit").play();
                score += 10;
            }
        }
    }
}
function playerdetectCollision(){
        for(var j=0; j<enemies.length; j++){
            if( Math.abs(hero.x - enemies[j].x) < 15 && Math.abs(hero.y - enemies[j].y) < 15)
            {
            enemies[j].x = Math.random()*500;
            enemies[j].y = 0;
            health.value -= 10;
            }
        }
    }
function playerdetectCollision2(){
        for(var j=0; j<bombers.length; j++){
            if( Math.abs(hero.x - bombers[j].x) < 40 && Math.abs(hero.y - bombers[j].y) < 40)
            {
            bombers[j].x = Math.random()*490;
            bombers[j].y = 0;
            health.value -= 10;
            }
        }
    }
function displayBullets(){
    var output = '';
    for(var i=0; i<bullets.length; i++){
        output += "<div class='bullet' style='top:"+bullets[i].y+"px; left:"+bullets[i].x+"px;'></div>";
    }
    document.getElementById('bullets').innerHTML = output;
}

var mainMusic = document.getElementById("mymusic");
function Music(){
    mainMusic.volume = 0.01;
    mainMusic.play(); 
}

function displayScore(){
    document.getElementById('score').innerHTML = score;
    
}
function Death(){
    if(health.value <= 0){
        location.reload();
    }
}


function gameLoop(){
    displayhero();
    moveEnemies();
    displayEnemies();
    moveBullets();
    displayBullets();
    detectCollision();
    displayScore();
    playerdetectCollision();
    playerdetectCollision2();
    displayBombers();
    moveBombers();
    detectCollision2();
    displayExplosion();
    moveBoard();
    Death();
    Music();
}

setInterval(gameLoop, 60);






var position = 0;
function moveBoard(){
    position++;
    if(position===560){
        position=0;
    }
    document.querySelector('#container').style.backgroundPosition="0px "+ position+"px";
}


document.onkeydown = function(a){
    if((a.keyCode == 37) && hero.x>5){
        hero.x -= 10;
    }else if((a.keyCode == 39) && hero.x <490){
        hero.x += 10;
    }
    else if((a.keyCode == 38) && hero.y > 0){
        hero.y -= 10;
    }
    else if((a.keyCode == 40) && hero.y < 480){
        hero.y += 10;
    }
    else if(a.keyCode == 32){
        bullets.push({x:hero.x+6, y:hero.y-15});
        displayBullets();
        document.getElementById('throw').volume = .2;
        document.getElementById('throw').load();
        document.getElementById('throw').play();
        
    }
} 

