///// p5 objects ///////
var canvas;
var button;
var slider1;
var slider2;
///////////////////////

///// Visual constants ///////
const bgCol = 0;
const XOffset = 50;
const YOffset = 150;
/////////////////////////////



///// Logic variables ///////
var x; //number of columns
var y; //number of rows
var matrix;
var mouseHeldDown = false;
////////////////////////////


///// Parameter variables ///////
var maxY = 50;
////////////////////////////////

function setup()
{
    createInputs();

    x = slider1.value();
    y = slider2.value();
    createTable();
}

function windowResized()
{
    resizeCanvas(windowWidth - 10, windowHeight - 10);
    canvas.position(5,5);
    button.position((width - 100), height/20);
    createTable();
}


function mousePressed()
{
        mouseHeldDown = true;
}
function mouseReleased()
{
    mouseHeldDown = false;
}

function draw()
{
    if(mouseHeldDown)
    {
        if(mouseX > XOffset && mouseY > YOffset && mouseX < width - XOffset && mouseY < height - YOffset)
        {
            //We are pressing a button in the table!
            let ColIndex = floor((mouseX - XOffset) / sizeX);
            let RowIndex = floor((mouseY - YOffset) / sizeY);
            console.log('<' + RowIndex + ', ' + ColIndex + '> pressed' );
            if(matrix.nodes[RowIndex][ColIndex].obstacle === false)
            {
                matrix.nodes[RowIndex][ColIndex].obstacle = true;
                drawTable(matrix);
            }
            
        }
    }
}

function createInputs() //A visuals creating function
{
    
    canvas = createCanvas(windowWidth - 10, windowHeight- 10);
    canvas.position(5,5);
    background(bgCol);

    button = createButton('OK!');
    button.position((width - 100), height/20);
    button.addClass('btn');

   
   slider1 = createSlider(10, 50, 30);
   slider1.position(250, 45);
   slider1.style('width', '200px');
   slider1.input(function()
   {
       x = slider1.value();
       createTable();
   });

   
   slider2 = createSlider(10, maxY, 10);
   slider2.position(700, 45);
   slider2.style('width', '200px');
   slider2.input(function()
   {
       y = slider2.value();
       createTable();
   });

   createTexts();

}

function createTexts()
{
    textSize(32);
    fill(255,255,255);
    text('Columns', 50, 60);
    text('Rows', 550, 60);
}