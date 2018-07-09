// TaskTree.js 任务树
// created at 2017-12-26
// 因未找到规律，childs只支持1-5个，

function TaskTree(type){
    this.treesArr = [
        {
            title: '早自习',
            isStart: false,
            childs: [
                {
                    title: '创业知多少',
                    isDone: false
                }
            ]
        },
        {
            title: '创前课',
            isStart: false,
            childs: [
                {
                    title: '嗨行动',
                    isDone: false
                },
                {
                    title: '创前培育',
                    isDone: false
                },
                {
                    title: '知识重构',
                    isDone: false
                },
                {
                    title: '创就规划',
                    isDone: false
                },
                {
                    title: '经营常识',
                    isDone: false
                },
            ]
        },
        {
            title: '打比赛',
            isStart: false,
            childs: [
                {
                    title: '第一年',
                    isDone: false
                },
                {
                    title: '第二年',
                    isDone: false
                },
                {
                    title: '第三年',
                    isDone: false
                },
                {
                    title: '第四年',
                    isDone: false
                }
            ]
        },
        {
            title: '报告会',
            isStart: false,
            childs: [
                {
                    title: '我的收获',
                    isDone: false
                },
                {
                    title: '团队计划',
                    isDone: false
                },
                {
                    title: '我的行动计划',
                    isDone: false
                }
            ]
        }
    ];
    // parent tree构建次数
    this.parentBuildCount = 0;
    this.parentLen = this.treesArr.length;
    this.mask = '';
    this.modal = '';
    this.scrollCon = '';
    this.init();
    return this;
}
// 构建一级树
TaskTree.prototype.buildParentTrees = function(parent,callback){
    this.parentBuildCount++;
    var parentSection = document.createElement('div');
    parentSection.className = 'parent-sec';
    // padding设置
    var paddingCon = document.createElement('div');
    paddingCon.className = 'padding-con';
    parentSection.appendChild(paddingCon);
    var vLine_rt = document.createElement('div');
    vLine_rt.className = 'v-line r-t';
    var vLine_mt = document.createElement('div');
    vLine_mt.className = 'v-line m';
    var vLine_rb = document.createElement('div');
    vLine_rb.className = 'v-line r-b';
    var vLine_mb = document.createElement('div');
    vLine_mb.className = 'v-line m';
    var hLine_t = document.createElement('div');
    hLine_t.className = 'h-line';
    var hLine_b = document.createElement('div');
    hLine_b.className = 'h-line';
    
    // 一级树按钮以上的line
    var topTree = document.createElement('div');
    paddingCon.appendChild(topTree);
    topTree.className = 'p-top-tree p-tree';
    topTree.appendChild(vLine_rt);
    topTree.appendChild(hLine_t);
    topTree.appendChild(vLine_mt);
    // 一级树按钮以下的line
    var btmTree = document.createElement('div');
    btmTree.className = 'p-btm-tree p-tree';
    btmTree.appendChild(vLine_mb);
    btmTree.appendChild(hLine_b);
    btmTree.appendChild(vLine_rb);
    // 一级button
    var button = document.createElement('div');
    button.className = 'p-button';
    button.innerHTML = parent.title;
    paddingCon.appendChild(topTree);
    paddingCon.appendChild(button);
    paddingCon.appendChild(btmTree);
    // 版块开始是否开始
    if(parent.isStart){
        button.classList.add('active');
        [vLine_rb, hLine_t, vLine_rt, vLine_mb, hLine_b, vLine_mt].forEach(function(line){
            line.classList.add('active');
        })
    }
    // 版块里子版块是否全部完成
    if(parent.allDone){
        
    }
    // 是否是第一个版块
    if(this.parentBuildCount===1){
        paddingCon.removeChild(topTree);
    }
    parentSection.appendChild(paddingCon);
    // 构建子版块树
    parentSection.appendChild(this.buildChildTrees(parent.childs, parent.isStart));

    return parentSection;
}
// 构建二级树
TaskTree.prototype.buildChildTrees = function(child, isStart, callback){
    // 子版块
    var childSection = document.createElement('div');
    childSection.className = 'child-sec';
    // 上面的table tree
    var table_t = document.createElement('table');
    table_t.className= 'tree-table tree-table-top';
    var table_b = document.createElement('table');
    table_b.className = 'tree-table tree-table-btm';
    this.buildTable(table_t, child, isStart, 'top');
    this.buildTable(table_b, child, isStart, 'bottom');
    
    // 子任务显示
    var ul = document.createElement('ul');
    ul.className = 'child-ul';
    for(var l_s = 0; l_s < child.length; l_s++){
        var li = document.createElement('li');
        if(child[l_s].isDone){
            li.className = 'active';
        }
        li.innerHTML = child[l_s].title;
        ul.appendChild(li);
    }
    // 下面的table tree
    childSection.appendChild(table_t);
    childSection.appendChild(ul);
    childSection.appendChild(table_b);
    return childSection;
}

TaskTree.prototype.init = function(){
    var treesLen = this.treesArr.length;
    var treeContainer = document.createElement('div');
    treeContainer.className = 'tree-container';
    for(var p_s = 0; p_s < treesLen; p_s++){
        treeContainer.appendChild(this.buildParentTrees(this.treesArr[p_s]));
    }
    // 添加模态层和遮罩层
    this.modal = document.createElement('div');
    this.modal.className = 'tree-modal';
    this.mask = document.createElement('div');
    this.mask.className = 'tree-mask';
    // 添加mui-scroll-wrapper、mui-scroll
    var scrollWrapper = document.createElement('div');
    this.scrollCon = document.createElement('div');
    scrollWrapper.className = 'mui-scroll-wrapper';
    this.scrollCon.className = 'mui-scroll';
    scrollWrapper.appendChild(this.scrollCon);
    this.scrollCon.appendChild(treeContainer);
    this.modal.appendChild(scrollWrapper);
    this.mask.appendChild(this.modal);
    document.body.appendChild(this.mask);
    // 如果有mui，初始化mui-scroll
    if(window.mui){
        mui('.mui-scroll-wrapper').scroll();
    }else{
        this.modal.classList.add('overflow');
    }
    var self = this;
    this.mask.onclick = function(e){
        if(e.target !== self.mask){
            return false;
        }
        self.slideOut();
    }
}

// table树接收四个参数，table节点、child数组、parent.isStart、position
TaskTree.prototype.buildTable = function(table, child, isStart, position){
    table.classList.add('tree-table-' + (child.length-1));
    var childLen = child.length;
    var colLen = (child.length-1)*2;
    var tbody = document.createElement('tbody');
    var row = document.createElement('tr');
    var doneCount = this.getChildDoneCount(child);
    // 上边框
    if(position === 'top'){
        for(var c_s = 0; c_s < colLen; c_s++){
            var col = document.createElement('td');
            // 若父版块已开始，上边框全部active
            if(isStart){
                col.classList.add('b-active');
            }
            // 若c_s为偶数，除2之后的左边框active
            if(Number.parseInt(c_s/2)===(c_s/2)&&child[c_s/2].isDone){
                col.classList.add('b-l-active');
            }
            // 若c_s为奇数，减1除2之后的右边框为active
            if(Number.parseInt(c_s/2)!==(c_s/2)&&child[(c_s+1)/2].isDone){
                col.classList.add('b-r-active');
            }
            row.appendChild(col);
        }
        // 下边框
    }else{
        if(this.parentLen > this.parentBuildCount){
            for(var c_s = 0; c_s < colLen; c_s++){
                var col = document.createElement('td');
                // 若c_s为偶数，除2之后的左边框active
                if(Number.parseInt(c_s/2)===(c_s/2)&&child[c_s/2].isDone){
                    col.classList.add('b-l-active');
                }
                // 若c_s为奇数，减1除2之后的右边框为active
                if(Number.parseInt(c_s/2)!==(c_s/2)&&child[(c_s+1)/2].isDone){
                    col.classList.add('b-r-active');
                }
                // 底边框着色没找到规律。。。
                // 两个内容
                if(colLen===2){
                    if(child[c_s].isDone){
                        col.classList.add('b-b-active');
                    }
                }
                // 三个内容
                if(colLen===4){
                    if((c_s===0||c_s===1)&&child[0].isDone){
                        col.classList.add('b-b-active');
                    }
                    if((c_s===2||c_s===3)&&child[2].isDone){
                        col.classList.add('b-b-active');
                    }
                }
                // 四个内容
                if(colLen === 6){
                    if((c_s===0||c_s===1)&&child[0].isDone){
                        col.classList.add('b-b-active');
                    }
                    if((c_s===2)&&child[1].isDone){
                        col.classList.add('b-b-active');
                    }
                    if(c_s===3&&child[2].isDone){
                        col.classList.add('b-b-active');
                    }
                    if((c_s===4||c_s===5)&&child[3].isDone){
                        col.classList.add('b-b-active');
                    }
                }
                // 五个内容
                if(colLen === 8){
                    if((c_s===0||c_s===1)&&child[0].isDone){
                        col.classList.add('b-b-active');
                    }
                    if((c_s===2||c_s===3)&&child[1].isDone){
                        col.classList.add('b-b-active');
                    }
                    if((c_s===4||c_s===5)&&child[3].isDone){
                        col.classList.add('b-b-active');
                    }
                    if((c_s===6||c_s===7)&&child[4].isDone){
                        col.classList.add('b-b-active');
                    }
                }
                row.appendChild(col);
            }
        }
        
    }
    
    tbody.appendChild(row);
    table.appendChild(tbody);
}
// 获取child tree里已完成的项目数
TaskTree.prototype.getChildDoneCount = function(child){
    var count = 0;
    var len = child.length;
    for(var c = 0; c < len; c++){
        if(child[c].isDone){
            count ++;
        }
    }
    return count;
}
// 任务树更新数据
TaskTree.prototype.updateData = function(type){
    // 根据type更新任务树
    // 采用如此方式的原因是无规律可循，一些child板块分为几个页面，还有几个child板块在一个页面
    switch (type){
        case '0':
        return;
        case '1-1':
        this.treesArr[0].isStart = true;
        break;
        case '1-2':
        this.treesArr[0].isStart = true;
        break;
        case '2-1':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        break;
        case '2-2':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        break;
        case '2-3':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        this.treesArr[1].childs[0].isDone = true;
        break;
        case '3-1':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[2].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        this.treesArr[1].childs[0].isDone = true;
        this.treesArr[1].childs[1].isDone = true;
        this.treesArr[1].childs[2].isDone = true;
        this.treesArr[1].childs[3].isDone = true;
        this.treesArr[1].childs[4].isDone = true;
        break;
        case '3-2':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[2].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        this.treesArr[1].childs[0].isDone = true;
        this.treesArr[1].childs[1].isDone = true;
        this.treesArr[1].childs[2].isDone = true;
        this.treesArr[1].childs[3].isDone = true;
        this.treesArr[1].childs[4].isDone = true;
        this.treesArr[2].childs[0].isDone = true;
        break;
        case '3-3':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[2].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        this.treesArr[1].childs[0].isDone = true;
        this.treesArr[1].childs[1].isDone = true;
        this.treesArr[1].childs[2].isDone = true;
        this.treesArr[1].childs[3].isDone = true;
        this.treesArr[1].childs[4].isDone = true;
        this.treesArr[2].childs[0].isDone = true;
        this.treesArr[2].childs[1].isDone = true;
        break;
        case '3-4':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[2].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        this.treesArr[1].childs[0].isDone = true;
        this.treesArr[1].childs[1].isDone = true;
        this.treesArr[1].childs[2].isDone = true;
        this.treesArr[1].childs[3].isDone = true;
        this.treesArr[1].childs[4].isDone = true;
        this.treesArr[2].childs[0].isDone = true;
        this.treesArr[2].childs[1].isDone = true;
        this.treesArr[2].childs[2].isDone = true;
        break;
        case '4-1':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[2].isStart = true;
        this.treesArr[3].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        this.treesArr[1].childs[0].isDone = true;
        this.treesArr[1].childs[1].isDone = true;
        this.treesArr[1].childs[2].isDone = true;
        this.treesArr[1].childs[3].isDone = true;
        this.treesArr[1].childs[4].isDone = true;
        this.treesArr[2].childs[0].isDone = true;
        this.treesArr[2].childs[1].isDone = true;
        this.treesArr[2].childs[2].isDone = true;
        this.treesArr[2].childs[3].isDone = true;
        break;
        case '4-2':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[2].isStart = true;
        this.treesArr[3].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        this.treesArr[1].childs[0].isDone = true;
        this.treesArr[1].childs[1].isDone = true;
        this.treesArr[1].childs[2].isDone = true;
        this.treesArr[1].childs[3].isDone = true;
        this.treesArr[1].childs[4].isDone = true;
        this.treesArr[2].childs[0].isDone = true;
        this.treesArr[2].childs[1].isDone = true;
        this.treesArr[2].childs[2].isDone = true;
        this.treesArr[2].childs[3].isDone = true;
        this.treesArr[3].childs[0].isDone = true;
        break;
        case '4-3':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[2].isStart = true;
        this.treesArr[3].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        this.treesArr[1].childs[0].isDone = true;
        this.treesArr[1].childs[1].isDone = true;
        this.treesArr[1].childs[2].isDone = true;
        this.treesArr[1].childs[3].isDone = true;
        this.treesArr[1].childs[4].isDone = true;
        this.treesArr[2].childs[0].isDone = true;
        this.treesArr[2].childs[1].isDone = true;
        this.treesArr[2].childs[2].isDone = true;
        this.treesArr[2].childs[3].isDone = true;
        this.treesArr[3].childs[0].isDone = true;
        this.treesArr[3].childs[1].isDone = true;
        break;
        case '5-1':
        this.treesArr[0].isStart = true;
        this.treesArr[1].isStart = true;
        this.treesArr[2].isStart = true;
        this.treesArr[3].isStart = true;
        this.treesArr[0].childs[0].isDone = true;
        this.treesArr[1].childs[0].isDone = true;
        this.treesArr[1].childs[1].isDone = true;
        this.treesArr[1].childs[2].isDone = true;
        this.treesArr[1].childs[3].isDone = true;
        this.treesArr[1].childs[4].isDone = true;
        this.treesArr[2].childs[0].isDone = true;
        this.treesArr[2].childs[1].isDone = true;
        this.treesArr[2].childs[2].isDone = true;
        this.treesArr[2].childs[3].isDone = true;
        this.treesArr[3].childs[0].isDone = true;
        this.treesArr[3].childs[1].isDone = true;
        this.treesArr[3].childs[2].isDone = true;
        break;
        default:
        break;
    };
    // 清空父元素构建次数
    this.parentBuildCount = 0;
    var treesLen = this.treesArr.length;
    var treeContainer = this.modal.querySelector('.tree-container');
    treeContainer.parentNode.removeChild(treeContainer);
    var newTreeCon = document.createElement('div');
    newTreeCon.className = 'tree-container';
    // 如果有mui，初始化mui-scroll
    if(window.mui){
        mui('.mui-scroll-wrapper').scroll();
    }else{
        this.modal.classList.add('overflow');
    }
    for(var p_s = 0; p_s < treesLen; p_s++){
        newTreeCon.appendChild(this.buildParentTrees(this.treesArr[p_s]));
    }
    this.scrollCon.appendChild(newTreeCon);
}
// 淡入
TaskTree.prototype.slideIn = function(){
    this.mask.style.display = 'block';
    var self = this;
    setTimeout(function(){
        self.mask.classList.add('in');
        self.modal.classList.add('slide-in');
    },30);
    
}
// 淡出
TaskTree.prototype.slideOut = function(){
    this.modal.className = this.modal.classList.value.replace(/slide\-in/, 'slide-out');
    console.log(this.modal.className)
    var self = this;
    setTimeout(function(){
        self.mask.className = 'tree-mask';
    }, 100);
    setTimeout(function(){
        self.modal.className = self.modal.classList.value.replace(/slide\-out/, '');
        self.mask.style.display = 'none';
    }, 300);
}