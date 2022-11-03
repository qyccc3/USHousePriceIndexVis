var mapsvg = document.querySelector('#svg');

var point = svg.createSVGPoint();
var viewBox = mapsvg.viewBox.baseVal;
var cachedViewBox = {
    x: viewBox.x,
    y: viewBox.y,
    width: viewBox.width,
    height: viewBox.height
};

window.addEventListener("click", onClick);

function onClick(event){
    event.preventDefault();
    window.removeEventListener("click", onClick);
    window.addEventListener("click",resetView);
    var scaleFactor = 3;
    var scaleDelta = 1 / scaleFactor;

    point.x = event.clientX;
    point.y = event.clientY;

    var cursorPoint = point.matrixTransform(mapsvg.getScreenCTM().inverse());
    var fromVars = {
        x: viewBox.x,
        y: viewBox.y,
        width: viewBox.width,
        height: viewBox.height,
    };
    viewBox.x -= (cursorPoint.x - viewBox.x) * (scaleDelta - 1);
    viewBox.y -= (cursorPoint.y - viewBox.y) * (scaleDelta - 1);
    viewBox.width *= scaleDelta;
    viewBox.height *= scaleDelta;
    TweenLite.from(viewBox, 0.5, fromVars);
}

function resetView(){
    TweenLite.to(viewBox, 0.4, {
        x: cachedViewBox.x,
        y: cachedViewBox.y,
        width: cachedViewBox.width,
        height: cachedViewBox.height,
        onComplete: function() {
          window.removeEventListener("click", resetView);
          window.addEventListener("click", onClick);
        }
      });
}