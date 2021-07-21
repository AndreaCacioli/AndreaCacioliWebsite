var canvas;
var button;


var x = 5;
var y = 5;

var topOffset = 300;

function setup()
{
    canvas = createCanvas(windowWidth - 10, windowHeight- 10);
    canvas.position(5,5);

    button = createButton('OK!');
    button.position((width - 100), height/20);
    button.addClass('btn');


   var slider1;
   slider1 = createSlider(10, 500, 50);
   slider1.position(50, 50);
   slider1.style('width', '200px');
   slider1.input(function()
   {
       x = slider1.value();
       createTable();
   });

   var slider2;
   slider2 = createSlider(10, 500, 50);
   slider2.position(350, 50);
   slider2.style('width', '200px');
   slider2.input(function()
   {
       y = slider2.value();
       createTable();
   });
}

function createTable()
{
    let h = height - topOffset;
    let w = width;
    let matrix = new Grid(x,y);
}

function draw()
{
    background(90);
}

function windowResized()
{
    resizeCanvas(windowWidth - 10, windowHeight - 10);
    canvas.position(5,5);
    button.position((width - 100), height/20);
}