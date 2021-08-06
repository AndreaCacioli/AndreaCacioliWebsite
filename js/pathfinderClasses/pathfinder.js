///// p5 objects ///////
var canvas;
var button;
var slider1;
var slider2;
var radio;
var columnText;
var rowText;
///////////////////////

///// Visual constants ///////
const bgCol = 0;
var XOffset;
var YOffset;

var okBtnPositionX;
var okBtnPositionY;

var slider1PosX;
var slider1PosY;
var slider1Width;

var slider2PosX;
var slider2PosY;
var slider2Width;

var radioButtonPosX;
var radioButtonPosY;
var radioButtonTextSize;

var columnTextSize;
var columnTextPosX;
var columnTextPosY;
var rowTextSize;
var rowTextPosX;
var rowTextPosY;

/////////////////////////////



///// Logic variables ///////
var x; //number of columns
var y; //number of rows
var matrix;
var mouseHeldDown = false;
var lastStart;
var lastEnd;
////////////////////////////


function setup()
{
    createInputs();

    x = slider1.value();
    y = slider2.value();
    createTable();
}

function windowResized()
{
    createInputs();
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

function reloadUI()
{
    ///// Visual constants ///////
    okBtnPositionX = (width - 100);
    okBtnPositionY = height/20;

    slider1PosX = 0.1497005988023952 * width;
    slider1PosY = 0.04712041884816754 * height;
    slider1Width = 0.11976047904191617 * width;

    slider2PosX = 0.41916167664670656 * width;
    slider2PosY = 0.04712041884816754 * height;
    slider2Width = 0.11976047904191617 * width;

    radioButtonPosX = 0.5688622754491018 * width; 
    radioButtonPosY = 0.031413612565445025 * height;
    radioButtonTextSize = 0.01437125748502994 * width;

    columnTextSize = 0.01219047619047619 * (width + height);
    columnTextPosX = 0.029940119760479042 * width;
    columnTextPosY = 0.06282722513089005 * height;
    rowTextSize = 0.01219047619047619 * (width + height);
    rowTextPosX = 0.32934131736526945 * width;
    rowTextPosY = 0.06282722513089005 * height;

    XOffset = 0.029940119760479042 * width;
    YOffset = 0.15706806282722513 * height;

    console.log(50 / width);
    console.log(150 / height);

    try{
        removeElements();
        button.remove();
        slider1.remove();
        slider2.remove();
        radio.remove(); //TODO: Figure out why it duplicates radio (not removed)
    }catch{

    }
    
    /////////////////////////////
}

function createInputs() //A visuals creating function
{   

    try{
        canvas.remove();
    }catch{
    }
    
    canvas = createCanvas(windowWidth - 10, windowHeight- 10);
    canvas.position(5,5);
    background(bgCol);

    reloadUI();

    button = createButton('OK!');
    button.position(okBtnPositionX, okBtnPositionY);
    button.addClass('btn');
    button.mousePressed(findPath);
    

    
    slider1 = createSlider(5, 50, 5);
    slider1.position(slider1PosX, slider1PosY);
    slider1.style('width', slider1Width.toString(10) + 'px');
    slider1.input(function()
    {
        x = slider1.value();
        createTable();
    });

    
    slider2 = createSlider(5, 50, 5);
    slider2.position(slider2PosX, slider2PosY);
    slider2.style('width', slider2Width.toString(10) + 'px');
    slider2.input(function()
    {
        y = slider2.value();
        createTable();
    });

    radio = createRadio(canvas, 'Choice');
    radio.option(1,'Place Blocks');
    radio.option(2,'Place Start');
    radio.option(3,'Place End');
    radio.style('font-size', radioButtonTextSize.toString(10) + 'px');
    radio.style('color', 'white');
    radio.position(radioButtonPosX,radioButtonPosY);

    createTexts();

}

function createTexts()
{
    fill(255,255,255);
    textSize(columnTextSize);
    columnText = text('Columns', columnTextPosX, columnTextPosY);
    textSize(rowTextSize);
    rowText = text('Rows', rowTextPosX, rowTextPosY);
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

