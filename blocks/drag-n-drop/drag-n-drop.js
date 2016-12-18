(function () {
  class DragnDrop {
    constructor ({elem}) {
      this._elem = elem;
      this._onMouseDown = this._onMouseDown.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onMouseUp = this._onMouseUp.bind(this);
      this._initEvent();
      
    }

    _initEvent () {
      this._elem.addEventListener('mousedown', this._onMouseDown);
      this._elem.addEventListener('dragstart', (event) => {
        event.preventDefault();
      });
      
    }

    _onMouseDown (event) {
      let target = event.target;
      console.log(target);
      let coords = this._getCoords(target);
      this._shiftX = event.pageX - coords.left;
      this._shiftY = event.pageY - coords.top;

      target.style.position = 'absolute';
      target.style.zIndex = 1000;

      document.body.appendChild(target);

      this._moveAt(target, event);

      document.addEventListener('mousemove', this._onMouseMove);
      this._elem.addEventListener('mouseup', this._onMouseUp);
    }

    _onMouseMove (event) {
      let target = event.target;
      this._moveAt(target, event);
    }

    _onMouseUp () {
    	document.removeEventListener('mousemove', this._onMouseMove);
    	this._elem.removeEventListener('mouseup', this._onMouseUp);
    }

    _moveAt (target, event) {
      target.style.left = event.pageX - this._shiftX + 'px';
      target.style.top = event.pageY - this._shiftY + 'px';
    }

    _getCoords (target) {
    let box = target.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

    }
  }

  window.dragndrop = DragnDrop; //export
})();