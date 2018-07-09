function SpinnerLoading(text){
    this.text = text || '加载中...';
    // 遮罩层
    this.mask = '';
    // 容器
    this.container = '';
    // 动画容器
    this.animateCon = '';
    // 文字容器
    if(this.text){
        this.textCon = '';
    }
    this.init();
    return this;
}

SpinnerLoading.prototype.build = function(){
    this.mask = document.createElement('div');
    this.mask.className = 'loading-spinner-mask';
    this.container = document.createElement('div');
    this.container.className = 'loading-container';
    this.animateCon = document.createElement('div');
    this.animateCon.className = 'loading-animate-con';
    for(var a_s = 0; a_s < 8; a_s++){
        var span = document.createElement('span');
        this.animateCon.appendChild(span);
    }
    if(this.text){
        this.textCon = document.createElement('p');
        this.textCon.className = 'loading-text-con';
        this.textCon.innerText = this.text;
    }
    this.container.appendChild(this.animateCon);
    if(this.textCon){
        this.container.appendChild(this.textCon);
    }
    this.mask.appendChild(this.container);
    document.body.appendChild(this.mask);
}
// loading初始化
SpinnerLoading.prototype.init = function(){
    // 生成loading
    this.build();
    var self = this;
    setTimeout(function(){
        self.mask.classList.add('show');
    },50);
}
// loding淡出
SpinnerLoading.prototype.hidden = function(){
    this.mask.classList.add('hidden');
    var self = this;
    setTimeout(function(){
        self.mask.parentNode.removeChild(self.mask);
    },300);
}

// loading设置text
SpinnerLoading.prototype.setText = function(text){
    this.textCon.innerText = text;
}