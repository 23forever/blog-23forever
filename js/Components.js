function Components(parent, childArr){
    this.parent = document.querySelector(parent);
    this.childArr = childArr;
    this.init();
    return this;
}

Components.prototype.createEl = function(el){
    var _el;
    _el = document.createElement(el.tagName);
    _el.className = el.className;
    el.href&&(_el.href = el.href);
    el.src&&(_el.src = el.src);
    el.type&&(_el.type = el.type);
    el.innerText&&(_el.innerText = el.innerText);
    el = null;
    return _el
}
Components.prototype.buildChild = function(child){
    var _child = this.createEl({
        tagName: 'div',
        className: 'col-xs-6 col-sm-3 col-md-3'
    });
    var comLink = this.createEl({
        tagName: 'a',
        className: 'child-wrapper',
        href: child.link
    });
    var mask = this.createEl({
        tagName: 'div',
        className: 'mask'
    });
    var detail = this.createEl({
        tagName: 'p',
        innerText: child.detail,
        className: 'detail'
    });
    var button = this.createEl({
        tagName: 'button',
        innerText: '体验一番',
        className: 'btn btn-default tips-btn'
    });
    var img = this.createEl({
        tagName: 'img',
        src: child.img
    });
    var title = this.createEl({
        tagName: 'p',
        className: 'title',
        innerText: child.title
    });
    mask.appendChild(detail);
    mask.appendChild(button);
    comLink.appendChild(mask);
    comLink.appendChild(img);
    comLink.appendChild(title);
    _child.appendChild(comLink);
    return _child;
}

Components.prototype.pushChild = function(childArr){
    var len = childArr.length;
    for(var s = 0; s < len; s++){
       this.parent.appendChild(this.buildChild(childArr[s]));
    }
}
Components.prototype.init = function(){
    this.pushChild(this.childArr);
}
Components.prototype.addChild = function(child){
    if(typeof child === 'object'){
        this.childArr.pushChild([child]);
    }else if(typeof child === 'array'){
        this.childArr.pushChild(child);
    }else{
        throw new Error(String(child) + ' is not a Array or a Object');
    }
    
}