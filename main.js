
let elements = document.querySelectorAll(".box")

elements.forEach( element => {
	element.onmousedown = function(event) {

	let shiftX = event.clientX - element.getBoundingClientRect().left;
	let shiftY = event.clientY - element.getBoundingClientRect().top;

	  element.style.position = 'absolute';
	  element.classList.add("dragg")
	  document.body.append(element);

	  moveAt(event.pageX, event.pageY);

	  function moveAt(pageX, pageY) {
		element.style.left = pageX - shiftX + 'px';
		element.style.top = pageY - shiftY + 'px';
		
	  }

	  function onMouseMove(event) {
		moveAt(event.pageX, event.pageY)
		colisionHandler(element);
	  }

	  document.addEventListener('mousemove', onMouseMove);

	  element.onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		element.onmouseup = null;
	  };

	  element.ondragstart = function() {
		return false;
	  };
	};
})

function colisionHandler(dragableElement, attemp = 3){

	if(attemp < 0) return null;

	elements.forEach(element => {
		if(element === dragableElement) return null;

		const isIntersect = isCollide(dragableElement.getBoundingClientRect(), element.getBoundingClientRect());

		if(isIntersect){
			movement(dragableElement, element);
			colisionHandler(element, attemp - 1);
		}
	})
}

function isCollide(aRect, bRect) {
	return !(
		((aRect.top + aRect.height) < (bRect.top)) ||
		(aRect.top > (bRect.top + bRect.height)) ||
		((aRect.left + aRect.width) < bRect.left) ||
		(aRect.left > (bRect.left + bRect.width))
	);
}

function getintersectionX (aRect, bRect) {
	if((bRect.left - aRect.left) < 0){
		return (bRect.right - aRect.left);
	}
		return ((aRect.width) +  (bRect.width)) - (bRect.right - aRect.left)
}

function getintersectionY (aRect, bRect) {

if((bRect.top - aRect.top) < 0){
	return (bRect.bottom - aRect.top);
}
		return ((aRect.height) + (bRect.height)) - (bRect.bottom - aRect.top)	
}


function movement(aElement,bElement){

	const aRect = aElement.getBoundingClientRect()
	const bRect = bElement.getBoundingClientRect()


	if( getintersectionX(aRect,bRect) < getintersectionY(aRect,bRect)){
		return 	bElement.style.left =  (bRect.left + (testX(aRect, bRect) * getintersectionX(aRect,bRect)) ) + 'px';
	}

	return	bElement.style.top =  (bRect.top + (testY(aRect, bRect) * getintersectionY(aRect,bRect)) ) + 'px';

}


function testX(aRect, bRect){
	console.log((bRect.left - aRect.left) / Math.abs(bRect.left - aRect.left));
	return (bRect.left - aRect.left) / Math.abs(bRect.left - aRect.left);
}
function testY(aRect, bRect){

	return (bRect.top - aRect.top) / Math.abs(bRect.top - aRect.top);
}
