let sizeX;
let sizeY;

class Grid
{
    constructor(height, width)
    {
        this.nodes = [];
        for(let i = 0; i < y; i++)
        {
            this.nodes.push([]);
            for(let j  = 0; j < x; j++)
            {
                var n = new Node();
                n.id = i * width + j;
                this.nodes[i].push(n);
            }
        }
        for(let i = 0; i < y; i++)
        {
            for(let j  = 0; j < x; j++)
            {
                let n = this.nodes[i][j];

                //Central nodes
                if(i > 0 && i < y-1 && j > 0 && j < x - 1)
                {
                    n.neighbors.push(this.nodes[i-1][j]);  //Up
                    n.neighbors.push(this.nodes[i][j-1]);  //Left
                    n.neighbors.push(this.nodes[i+1][j]);  //Down
                    n.neighbors.push(this.nodes[i][j+1]);  //Right
                }
                //lateral nodes
                else if(j == 0 || j == x - 1)
                {
                    if(j == 0)
                    {
                        n.neighbors.push(this.nodes[i][j+1]);  //Right
                    }else{
                        n.neighbors.push(this.nodes[i][j-1]);  //Left
                    }
                    if(i != 0)
                    {
                        n.neighbors.push(this.nodes[i-1][j]);  //Up
                    }
                    if(i != height-1)
                    {
                        n.neighbors.push(this.nodes[i+1][j]);  //Down
                    }
                }
                //Top and bottom nodes
                else if(i == 0 || i == y - 1)
                {
                    n.neighbors.push(this.nodes[i][j-1]);  //Left
                    n.neighbors.push(this.nodes[i][j+1]);  //Right
                    if(i == 0)
                    {
                        n.neighbors.push(this.nodes[i+1][j]);  //Down
                    }else{
                        n.neighbors.push(this.nodes[i-1][j]);  //Up
                    }
                }
            }
        }
    }
}

function createTable()
{
    background(bgCol);
    createTexts();
    matrix = new Grid(y,x);
    lastStart = matrix.nodes[0][0];
    matrix.nodes[0][0].start = true;
    lastEnd= matrix.nodes[y-1][x-1];
    matrix.nodes[y-1][x-1].end = true;
    strokeWeight(4);
    stroke('black');
    drawTable(matrix);
}

function drawTable(matrix)
{
    sizeX = (width - 2*XOffset) / x;
    sizeY = (height - 2*YOffset) / y;
    
    for(let i = 0; i < y;i++)
    {
        for(let j = 0; j < x; j++)
        {
            let startx = XOffset + j * sizeX;
            let starty = YOffset + i * sizeY;
            if(matrix.nodes[i][j].start)
            {
                fill(0,255,0);
            }
            else if(matrix.nodes[i][j].end)
            {
                fill(255,0,0);
            }
            else if(matrix.nodes[i][j].isPath)
            {
                fill(255,0,255);
            }
            else if(matrix.nodes[i][j].visited)
            {
                fill(0,0,255);
            }
            else if(matrix.nodes[i][j].obstacle)
            {
                fill(60,60,60);
            }
            else
            {
                fill(255,255,255);
            }
            rect(startx, starty, sizeX, sizeY, 10);
        }
    } 
}