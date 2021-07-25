class Grid
{
    constructor(height, width)
    {
        this.nodes = [];
        for(let i = 0; i < height; i++)
        {
            this.nodes.push([]);
            for(let j  = 0; j < width; j++)
            {
                var n = new Node();
                n.id = i * width + j;
                this.nodes[i].push(n);
            }
        }
        for(let i = 0; i < height; i++)
        {
            for(let j  = 0; j < width; j++)
            {
                let n = this.nodes[i][j];

                //Central nodes
                if(i > 0 && i < height-1 && j > 0 && j < width - 1)
                {
                    n.neighbors.push(this.nodes[i-1][j]);  //Up
                    n.neighbors.push(this.nodes[i][j-1]);  //Left
                    n.neighbors.push(this.nodes[i+1][j]);  //Down
                    n.neighbors.push(this.nodes[i][j+1]);  //Right
                }
                //lateral nodes
                else if(j == 0 || j == width - 1)
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
                else if(i == 0 || i == height - 1)
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
    matrix = new Grid(x,y);
    strokeWeight(4);
    stroke('black');
    let sizeX = (width - 2*XOffset) / x;
    let sizeY = (height - 1.5*YOffset) / y;
    for(let i = 0; i < x;i++)
    {
        for(let j = 0; j < y; j++)
        {
            let startx = XOffset + i * sizeX;
            let starty = YOffset + j * sizeY;
            rect(startx, starty, sizeX, sizeY, 10);
        }
    } 
}