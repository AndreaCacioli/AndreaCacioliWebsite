class Node
{
    constructor(neighbors)
    {
        this.neighbors = neighbors;
        this.visited = false;
        this.id = 0;
    }
    constructor()
    {
        this.neighbors = [];
        this.visited = false;
        this.id = 0;
    }
}