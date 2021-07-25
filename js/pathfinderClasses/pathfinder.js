var canvas;
var button;
var slider1;
var slider2;

const bgCol = 90;
const XOffset = 100;
const YOffset = 200;

var x;
var y;
var matrix;

var maxY = 50;
var topOffset = 300;

function setup()
{
    canvas = createCanvas(windowWidth - 10, windowHeight- 10);
    canvas.position(5,5);

    button = createButton('OK!');
    button.position((width - 100), height/20);
    button.addClass('btn');


   
   slider1 = createSlider(10, 50, 30);
   slider1.position(50, 50);
   slider1.style('width', '200px');
   slider1.input(function()
   {
       x = slider1.value();
       createTable();
   });

   
   slider2 = createSlider(10, maxY, 10);
   slider2.position(350, 50);
   slider2.style('width', '200px');
   slider2.input(function()
   {
       y = slider2.value();
       createTable();
   });


   x = slider1.value();
   y = slider2.value();
   background(bgCol);
   createTable();
}

function windowResized()
{
    resizeCanvas(windowWidth - 10, windowHeight - 10);
    canvas.position(5,5);
    button.position((width - 100), height/20);
    createTable();
}