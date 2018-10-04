(function () {
    var swipper = {};
    let container;
    let curentIndex = 1;  //控制当前图片的index
    let imgNums = 0;
    let imgContainer;
    let timer;
    swipper.init = function(nums) {
        imgNums = nums;
        swipper.renderUI();
        container.addEventListener('click', swipper.changeImg, false);   //事件委托
        swipper.startTimer();
    };
    swipper.startTimer = function() {   //自动切换图片
        timer = setInterval(function () {
            swipper.changeLastPic();
            swipper.changeButtonColor();
        }, 1500);
    };
    swipper.changeLastPic = function() {   //切换到最后一张图片的处理函数
        imgContainer = document.querySelector('#img-container');
        curentIndex++;
        let imgContainerLeft = imgContainer.style.left === '' ? 0 : imgContainer.style.left;   //第一次获取的dom.style.left是空的处理
        if (curentIndex > imgNums) {   //最后一张再往右的处理
            curentIndex = 1;
            imgContainer.style.left = 0 + 'px';
        }else {
            imgContainer.style.left = parseInt(imgContainerLeft) - 300 + 'px';
        }
    };
    swipper.changeButtonColor = function() {  //改变按钮颜色
        let buttonContainer = document.querySelector('#button-container');
        for (let i = 0; i < imgNums; i++) {
            if(buttonContainer.children.item(i).dataset.index === curentIndex.toString()) {
                buttonContainer.children.item(i).className = 'ui-swipper-button-select';
            }else {
                buttonContainer.children.item(i).className = '';
            }
        }
    };
    swipper.renderUI = function() {   //初始化ui
        container = document.createElement('div');
        let imgContainer = document.createElement('div');
        let buttonContainer = document.createElement('div');
        let prev = document.createElement('span');
        let next = document.createElement('span');
        prev.innerHTML = '&lt;';
        next.innerHTML = '&gt;';
        container.className = 'ui-swipper-container';
        imgContainer.className = 'ui-swipper-img-container';
        imgContainer.style.width = 300 * imgNums + 'px';   //根据图片数量改变大小
        imgContainer.id = 'img-container';
        buttonContainer.id = 'button-container';
        buttonContainer.className = 'ui-swipper-button-container';
        prev.className = 'ui-swipper-prev';
        next.className = 'ui-swipper-next';
        let imgFragment = document.createDocumentFragment();
        let buttonFragment = document.createDocumentFragment();   //用frament减少操作dom的操作
        for (let i = 0; i < imgNums; i++) {
            let img = document.createElement('img');
            img.src = './img/' + (i + 1) + '.jpeg';
            let button = document.createElement('span');
            button.setAttribute('data-index', (i + 1).toString());
            if(button.dataset.index === curentIndex.toString()) {
                button.className = 'ui-swipper-button-select';
            }
            imgFragment.appendChild(img);
            buttonFragment.appendChild(button);
        }
        imgContainer.appendChild(imgFragment);
        buttonContainer.appendChild(buttonFragment);
        container.appendChild(imgContainer);
        container.appendChild(buttonContainer);
        container.appendChild(prev);
        container.appendChild(next);
        document.body.appendChild(container);
    };
    swipper.changeImg = function(e) {
        clearInterval(timer);   //点击的时候先清除自动切换
        imgContainer = document.querySelector('#img-container');
        let target = e.target;
        if (target.tagName === 'SPAN') {   //点击的为按钮
            if (target.dataset.index) {
                let index = target.dataset.index;
                curentIndex = target.dataset.index;
                imgContainer.style.left = -300 * (index - 1) + 'px';
            }
            if(target.classList.contains('ui-swipper-prev')) {   //点击的为左箭头
                curentIndex--;
                if (curentIndex === 0) {    //第一张再往左的处理
                    curentIndex = imgNums;
                    imgContainer.style.left = -300 * (imgNums - 1) + 'px';
                }else {
                    imgContainer.style.left = parseInt(imgContainer.style.left) + 300 + 'px';
                }
            }
            if(target.classList.contains('ui-swipper-next')) {  //点击的为右箭头
                swipper.changeLastPic();
            }
            swipper.changeButtonColor()
        }
        swipper.startTimer();
    };

    window.swipper = swipper;
})();