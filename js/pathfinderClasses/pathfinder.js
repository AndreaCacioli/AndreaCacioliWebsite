///// p5 objects ///////
var canvas;
var button;
var slider1;
var slider2;
var radio;
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
var lastStart;
var lastEnd;
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
function touchStarted()
{
        mouseHeldDown = true;
}
function touchEnded()
{
    mouseHeldDown = false;
}

function draw()
{
    if(radio.value() == 1)
    {
        //Place blocks
        if(mouseHeldDown)
        {
            if(mouseX > XOffset && mouseY > YOffset && mouseX < width - XOffset && mouseY < height - YOffset)
            {
                //We are pressing a button in the table!
                let ColIndex = floor((mouseX - XOffset) / sizeX);
                let RowIndex = floor((mouseY - YOffset) / sizeY);
                //console.log('<' + RowIndex + ', ' + ColIndex + '> pressed' );
                if(matrix.nodes[RowIndex][ColIndex].obstacle == false && matrix.nodes[RowIndex][ColIndex].start == false && matrix.nodes[RowIndex][ColIndex].end == false)
                {
                    matrix.nodes[RowIndex][ColIndex].obstacle = true;
                    drawTable(matrix);
                }
                
            }
        }
    }
    if(radio.value() == 2)
    {
        //Place blocks
        if(mouseHeldDown)
        {
            if(mouseX > XOffset && mouseY > YOffset && mouseX < width - XOffset && mouseY < height - YOffset)
            {
                //We are pressing a button in the table!
                let ColIndex = floor((mouseX - XOffset) / sizeX);
                let RowIndex = floor((mouseY - YOffset) / sizeY);
                //console.log('<' + RowIndex + ', ' + ColIndex + '> pressed' );
                if(matrix.nodes[RowIndex][ColIndex].obstacle == false && matrix.nodes[RowIndex][ColIndex].start == false && matrix.nodes[RowIndex][ColIndex].end == false)
                {
                    lastStart.start = false;
                    lastStart = matrix.nodes[RowIndex][ColIndex];
                    matrix.nodes[RowIndex][ColIndex].start = true;
                    drawTable(matrix);
                }
                
            }
        }
    }
    if(radio.value() == 3)
    {
        //Place blocks
        if(mouseHeldDown)
        {
            if(mouseX > XOffset && mouseY > YOffset && mouseX < width - XOffset && mouseY < height - YOffset)
            {
                //We are pressing a button in the table!
                let ColIndex = floor((mouseX - XOffset) / sizeX);
                let RowIndex = floor((mouseY - YOffset) / sizeY);
                //console.log('<' + RowIndex + ', ' + ColIndex + '> pressed' );
                if(matrix.nodes[RowIndex][ColIndex].obstacle == false && matrix.nodes[RowIndex][ColIndex].start == false && matrix.nodes[RowIndex][ColIndex].end == false)
                {
                    lastEnd.end = false;
                    lastEnd = matrix.nodes[RowIndex][ColIndex];
                    matrix.nodes[RowIndex][ColIndex].end = true;
                    drawTable(matrix);
                }
                
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
    button.mousePressed(findPath)

    
    slider1 = createSlider(5, 50, 5);
    slider1.position(250, 45);
    slider1.style('width', '200px');
    slider1.input(function()
    {
        x = slider1.value();
        createTable();
    });

    
    slider2 = createSlider(5, maxY, 5);
    slider2.position(700, 45);
    slider2.style('width', '200px');
    slider2.input(function()
    {
        y = slider2.value();
        createTable();
    });

    radio = createRadio(canvas, 'Choice');
    radio.option(1,'Place Blocks');
    radio.option(2,'Place Start');
    radio.option(3,'Place End');
    radio.style('width', '700px');
    radio.style('height', '400px')
    radio.style('font-size', '32px');
    radio.style('color', 'white');
    radio.position(1000,25);


    createTexts();

}

function createTexts()
{
    textSize(32);
    fill(255,255,255);
    text('Columns', 50, 60);
    text('Rows', 550, 60);
}

async function findPath()
{
    var queue = [lastStart];
    while(queue.length != 0)
    {
        var node = queue.shift();
        node.visited = true;
        if(node.id === lastEnd.id) break;
        for(let i = 0; i < node.neighbors.length; i++)
        {
            if(!node.neighbors[i].visited && !node.neighbors[i].obstacle && !queue.includes(node.neighbors[i]))
            {
                node.neighbors[i].visitedBy = node;
                queue.push(node.neighbors[i]);
            }
        }
        drawTable(matrix);
        await sleep(20);
    }
    let path = [];
    let n = lastEnd;
    while(n.id != lastStart.id)
    {
        path.push(n);
        n.isPath = true;
        n = n.visitedBy;
        drawTable(matrix);
        await sleep(20);
    }
    
    console.log(path.reverse());
    
}

function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}