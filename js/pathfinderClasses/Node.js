class Node
{
    constructor()
    {
        this.neighbors = [];
        this.visited = false;
        this.id = 0;
        this.obstacle = false;
        this.start = false;
        this.end = false;
        this.visitedBy = null;
        this.isPath = false;
    }
}