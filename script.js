var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 2 ;

setCanvasSize(canvas);
listenToUser(canvas);

//切换颜色
red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle='red'
  red.classList.add('active')
  green.classList.remove('active')
  black.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle='blue'
  blue.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
}
green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle='green'
  green.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}
black.onclick = function(){
  context.fillStyle = 'black'
  context.strokeStyle='black'
  green.classList.remove('active')
  black.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}

//切换粗细
thin.onclick = function(){
  lineWidth = 2
}

medium.onclick = function(){
  lineWidth = 6
}

thick.onclick = function(){
  lineWidth = 10
}

//清屏
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height);
}

//下载
download.onclick = function(){
  var url = canvas.toDataURL('image/png')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = 'pic'
  a.target = '_blank'
  a.click()
}

// listenToMouse(canvas);

function listenToUser(canvas){
  var lastPoint = {
    x:undefined,
    y:undefined
  }
  var using = false;
  
  if(document.body.ontouchstart !==undefined){
  //触屏
    canvas.ontouchstart = function(aaa){
        var x = aaa.touches[0].clientX;
        var y = aaa.touches[0].clientY;
        using = true;
        if(eraserEnabled){
          context.clearRect(x-10,y-10,20,20);
      }
        else{
          lastPoint = {x:x,y:y};
      }
    }

    canvas.ontouchmove = function(bbb){
      var x = bbb.touches[0].clientX;
      var y = bbb.touches[0].clientY;
      if(!using){return}
      if(eraserEnabled){
          context.clearRect(x-10,y-10,20,20);
        }
      else{
        var newPoint = {x:x,y:y};
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint=newPoint;
        }
    }

    canvas.ontouchend = function (){
        using = false;
    }
  }
  else{
  //非触屏
      canvas.onmousedown = function(aaa){
        var x = aaa.clientX;
        var y = aaa.clientY;
        using = true;
        if(eraserEnabled){
          context.clearRect(x-10,y-10,20,20);
      }
        else{
          lastPoint = {x:x,y:y};
      }
    };

      canvas.onmousemove = function(bbb){
        var x = bbb.clientX;
        var y = bbb.clientY;
        if(!using){return;}
        if(eraserEnabled){
            context.clearRect(x-10,y-10,20,20);
          }
        else{
          var newPoint = {x:x,y:y};
          drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
          lastPoint=newPoint;
        }
      };

      canvas.onmouseup = function(ccc){
        using = false;
      }
    }
  }


//设置页面大小

function setCanvasSize(canvas){
  var pageWidth=document.documentElement.clientWidth;
  var pageHeight=document.documentElement.clientHeight;

  canvas.width = pageWidth;
  canvas.height =pageHeight;
}

// //设置橡皮擦

var eraserEnabled = false;
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true;
    eraser.classList.add('active')
    pen.classList.remove('active')
}



//画线
function drawLine(x1,y1,x2,y2){
      context.beginPath();
      context.moveTo(x1,y1);
      context.lineTo(x2,y2);
      context.lineWidth = lineWidth;
      context.stroke();
      context.closePath();
}


