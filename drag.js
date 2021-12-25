if(!localStorage.camHide) localStorage.camHide = false
function dragElement(elmnt) {
  var atRight = false;
  if(localStorage.atRight) atRight = JSON.parse(localStorage.atRight)
  var atBottom = false;
  if(localStorage.atBottom) atBottom = JSON.parse(localStorage.atBottom)
  //console.log('atRight:',atRight,'atBottom:',atBottom)
  if(atRight==true) 
  {
    newLeft = (window.innerWidth - elmnt.offsetWidth) - ((20/100*window.innerWidth) + 20)
    elmnt.style.left = newLeft + "px";
  }
  if(atBottom==true) {
    newTop = (window.innerHeight - elmnt.offsetHeight) - 25
    elmnt.style.top = newTop + "px";
  }
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    newTop = ((elmnt.offsetTop - pos2) / window.innerHeight * 100)
    newLeft =  ((elmnt.offsetLeft - pos1) / window.innerWidth * 100)
    if(newTop<=0) newTop = 1
    if(newLeft<=0) newLeft = 1
    elmnt.style.top = newTop + "%";
    elmnt.style.left = newLeft + "%";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    if(newLeft <= 40) {
      atRight = false
      newLeft = 25
    }
    else { 
      atRight = true
      newLeft = (window.innerWidth - elmnt.offsetWidth) - ((20/100*window.innerWidth) + 20)
    }
    if(newTop <= 40) {
      atBottom = false
      newTop = 25 
    } 
    else {
      atBottom = true
      newTop = (window.innerHeight - elmnt.offsetHeight) - 25
    } 
    elmnt.style.top = newTop + "px";
    elmnt.style.left = newLeft + "px";
    localStorage.atBottom = atBottom
    localStorage.atRight = atRight
  }
  window.onresize = ()=>{
    if(atRight) { 
      newLeft = (window.innerWidth - elmnt.offsetWidth) - ((20/100*window.innerWidth) + 20)
      elmnt.style.left = newLeft + "px";
    }
    if(atBottom) { 
      newTop = (window.innerHeight - elmnt.offsetHeight) - 25
      elmnt.style.top = newTop + "px";
    }
  }
  window.onkeypress = (evt)=>{
    if(evt.key!="c") return;
      camHide = !JSON.parse(localStorage.camHide)
      videoHeader.style.visibility = camHide?"hidden":"visible"
      localStorage.camHide = camHide
  }
}

document.querySelectorAll('*[draggable]').forEach((elem)=>{
  elmnt = elem
  console.log(elem)
  dragElement(elem)
})