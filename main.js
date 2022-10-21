// Елементи HTML
const canv = document.getElementById("canv");
const button = document.getElementById('button');


// Прослуховування евентів
canv.addEventListener('click',(e) => {leftclick(e);});
canv.addEventListener('contextmenu',(e) => {rightclick(e)});
button.addEventListener('click',(e) =>{usebutton(e)});


// Параметри холста канвас
const c = canv.getContext('2d');
canv.width = 1000;
canv.height = 400;
c.strokeRect(0, 0, canv.width, canv.height);


// Основні перемінні
let coun = 2;
let counCirc = 2;
const firstPos = {x: 0, y: 0};
const secondPos = {x: 0, y: 0};
const lines = {};
const circle = {};


// Функція лівого кліка
function leftclick(ev){
    if (coun % 2 === 0){
    firstPos.x = Number(ev.clientX);
    firstPos.y = Number(ev.clientY);
    canv.addEventListener('mousemove', (e) =>{
        if (coun %2 === 1){
        c.clearRect( 1, 1, canv.width - 2, canv.height - 2);
        c.beginPath();
        c.strokeStyle = "black";
        c.moveTo(firstPos.x, firstPos.y);
        c.lineTo(e.clientX, e.clientY);
        c.stroke();
        try{for(i in lines){
            c.beginPath();
            c.strokeStyle = "black";
            c.moveTo(lines[i].firstPos.x, lines[i].firstPos.y);
            c.lineTo(lines[i].secondPos.x, lines[i].secondPos.y);
            c.stroke();
            pointOfLines(lines[i].firstPos.x, lines[i].firstPos.y,lines[i].secondPos.x, lines[i].secondPos.y,firstPos.x, firstPos.y,e.clientX, e.clientY)};
        for(int in circle){
            c.beginPath();
            c.fillStyle = "red";
            c.arc(circle[int].center.x, circle[int].center.y, circle[int].radius, circle[int].start, circle[int].end);
            c.fill();
        }}catch{}         
        }else{}
    })
    coun +=1;
    return}
    else if(coun % 2 === 1){
    c.beginPath();
    c.strokeStyle = "black";
    c.moveTo(firstPos.x, firstPos.y);
    c.lineTo(ev.clientX, ev.clientY);
    c.stroke();
    secondPos.x = Number(ev.clientX);
    secondPos.y = Number(ev.clientY);
    lines[coun] = {firstPos:{x:firstPos.x, y:firstPos.y},secondPos:{x:secondPos.x, y:secondPos.y}};
    try{
        for(i in lines){
            pointOfLines(lines[i].firstPos.x, lines[i].firstPos.y,lines[i].secondPos.x, lines[i].secondPos.y,firstPos.x, firstPos.y,ev.clientX, ev.clientY);
            counCirc +=1;
        }
    }catch(err){}
    coun +=1;
    return;} 
}


// Функція правого кліку
function rightclick(e){
    e.preventDefault();
    if (coun %2 === 1){
        c.clearRect( 1, 1, canv.width - 2, canv.height - 2);
        coun += 1;
        delete circle[counCirc];
        try{for(i in lines){
            c.beginPath();
            c.strokeStyle = "black";
            c.moveTo(lines[i].firstPos.x, lines[i].firstPos.y);
            c.lineTo(lines[i].secondPos.x, lines[i].secondPos.y);
            c.stroke();
        }for(int in circle){
            c.beginPath();
            c.fillStyle = "red";
            c.arc(circle[int].center.x, circle[int].center.y, circle[int].radius, circle[int].start, circle[int].end);
            c.fill();
        }}catch{}         
    }else{}
    return;
}


// Функція розрахунку перетину ліній
function pointOfLines(x1, y1, x2, y2, x3, y3, x4, y4){
    const a1 = x2 - x1;
    const b1 = x4 - x3;
    const c1 = x3 - x1;
    const a2 = y2 - y1;
    const b2 = y4 - y3;
    const c2 = y3 - y1;
    const sx = (c1*b2 - c2*b1)/(a1*b2 - a2*b1);
    const sy = (a1*c2 - a2*c1)/(a1*b2 - a2*b1);
    if (sx >= 0 && sy <= 0 && sx <= 1 && sy >= -1){
        const centX = (x1 + sx*(x2 - x1));
        const centY = (y1 + sx*(y2 - y1));
        c.beginPath();
        c.fillStyle = "red";
        c.arc(centX, centY,5, 0, Math.PI*2,);
        c.fill();
        if (coun % 2 === 1){
            circle[counCirc] = {center:{x:centX, y:centY},radius:5, start:0, end: Math.PI*2};
        }
    }else{return}
}


// Функція кнопки коллапсу
function usebutton(e){
    e.preventDefault();
    c.clearRect( 1, 1, canv.width - 2, canv.height - 2);
    try{for(let int = 0; int < 300; int++){
        setTimeout(() =>{
        c.clearRect( 1, 1, canv.width - 2, canv.height - 2);     
        for(i in lines){
        let xcenter = Number((lines[i].firstPos.x + lines[i].secondPos.x)/2);
        let ycenter = Number((lines[i].firstPos.y + lines[i].secondPos.y)/2);      
        let pathOfOneTickFirst = (lines[i].firstPos.x - xcenter)/300;
        let pathOfOneTickSecond = (lines[i].secondPos.x - xcenter)/300;

        if (pathOfOneTickFirst < 0){pathOfOneTickFirst = pathOfOneTickFirst*(-1)}
        if (pathOfOneTickSecond < 0){pathOfOneTickSecond = pathOfOneTickSecond*(-1)}
        else{}

        let y1= (((ycenter - lines[i].firstPos.y)*(pathOfOneTickFirst*int))/(xcenter - lines[i].firstPos.x)) + lines[i].firstPos.y
        let y2= (((lines[i].firstPos.y - ycenter)*((lines[i].firstPos.x - pathOfOneTickFirst*int)- xcenter))/(lines[i].firstPos.x - xcenter)) + ycenter
        let y3= (((ycenter - lines[i].secondPos.y)*(pathOfOneTickFirst*int))/(xcenter - lines[i].secondPos.x)) + lines[i].secondPos.y
        let y4= (((lines[i].secondPos.y - ycenter)*((lines[i].secondPos.x - pathOfOneTickFirst*int)- xcenter))/(lines[i].secondPos.x - xcenter)) + ycenter 
        if (xcenter >= lines[i].firstPos.x){
            c.beginPath();
            c.strokeStyle = "black";
            c.moveTo(lines[i].firstPos.x + pathOfOneTickFirst*int, y1);
            c.lineTo(xcenter, ycenter);
            c.stroke()
        }else if (xcenter <= lines[i].firstPos.x){
            c.beginPath();
            c.strokeStyle = "black";
            c.moveTo(lines[i].firstPos.x - pathOfOneTickFirst*int, y2);
            c.lineTo(xcenter, ycenter);
            c.stroke()
        }else{}
        if (xcenter >= lines[i].secondPos.x){            
            c.beginPath();
            c.strokeStyle = "black";
            c.moveTo(lines[i].secondPos.x + pathOfOneTickSecond*int, y3);
            c.lineTo(xcenter, ycenter);
            c.stroke()
        }else if (xcenter <= lines[i].secondPos.x){
            c.beginPath();
            c.strokeStyle = "black";
            c.moveTo(lines[i].secondPos.x - pathOfOneTickSecond*int, y4);
            c.lineTo(xcenter, ycenter);
            c.stroke()
        }else{}
        try{for(inn in circle){
            c.beginPath();
            c.fillStyle = "red";
            c.arc(circle[inn].center.x, circle[inn].center.y, circle[inn].radius, circle[inn].start, circle[inn].end);
            c.fill();
        }}catch(err){}
        try{
        for(inte in circle){
            if ((circle[inte].center.x).toFixed(0) - (lines[i].firstPos.x  + pathOfOneTickFirst*int).toFixed(0) == 0 && (circle[inte].center.y).toFixed(0) - (y1).toFixed(0) == 0 ){delete circle[inte]}   
            else if ((circle[inte].center.x).toFixed(0) - (lines[i].secondPos.x  + pathOfOneTickFirst*int).toFixed(0) == 0 && (circle[int].center.y).toFixed(0) - (y3).toFixed(0) == 0 ){delete circle[inte]}
            else if ((circle[inte].center.x).toFixed(0) - (lines[i].firstPos.x  - pathOfOneTickFirst*int).toFixed(0) == 0 && (circle[inte].center.y).toFixed(0) - (y2).toFixed(0) == 0 ){delete circle[inte]}
            else if ((circle[inte].center.x).toFixed(0) - (lines[i].secondPos.x  - pathOfOneTickFirst*int).toFixed(0) == 0 && (circle[inte].center.y).toFixed(0) - (y4).toFixed(0) == 0 ){delete circle[inte]}
            else{}}}catch(err){}
    }},int*10)               
    }}catch(err){}
    setTimeout(() =>{                
        c.clearRect( 1, 1, canv.width - 2, canv.height - 2);
        for(i in circle){delete circle[i]};
        coun = 2;
        counCirc = 2;
        firstPos.x = 0;
        firstPos.y = 0;
        secondPos.x = 0;
        secondPos.y = 0;},
    3000)
}







