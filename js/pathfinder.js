var canvas
var button
var slider

function setup()
{
    canvas = createCanvas(windowWidth - 10, windowHeight- 10)
    canvas.position(5,5)

    button = createButton('OK!')
    button.position((width - 100), height/20)
    button.addClass('btn')

   
   slider = createSlider(10, 500, 50);
   slider.position(10, 10);
   slider.style('width', '200px');
   slider.position(200, height/20);
   slider.input(function(){
       console.log(slider.value())
   })

}

function draw()
{
    background(90)
}

function windowResized()
{
    resizeCanvas(windowWidth - 10, windowHeight - 10)
    canvas.position(5,5)
    button.position((width - 100), height/20)
}