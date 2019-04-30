(function () {
    let colChoose = document.querySelector('#color-picker'),
        prevCol = document.querySelector('#prev-circle');
    chooseBar = document.querySelector('#color-bar'),
        mainBox = document.querySelector("container"),
        chooseBartrasnform = document.querySelector('#figure-bar'),
        brownCol = document.querySelector('#brown'),
        blackCol = document.querySelector('#black'),
        greenCol = document.querySelector('#green'),
        redCol = document.querySelector('#red-circle'),
        gradientCol = document.querySelector('#gradient-circle'),
        magentaCol = document.querySelector('#magenta'),
        colorItem = document.querySelectorAll('.color-item'),
        currentColor = document.querySelector('#current-circle'),
        currenForm = document.querySelector("#form"),
        drawArea = document.querySelector('#draw-block'),
        colorElements = [];

    let bucket = document.querySelector('#bucket'),
        transform = document.querySelector('#transform'),
        move = document.querySelector('#move');

    let elementBlock = document.querySelectorAll('#element');


    setupColors();
    setupColorElements();




    colChoose.addEventListener('click', openBar);

    bucket.addEventListener('click', changeElementColor);

    transform.addEventListener('click', transformElement);
    move.addEventListener('click', moveElement);

    colorElements.forEach(function (elem, i) {
        elem.addEventListener('click', changeCurrentColor);
    });


    function changeElementColor() {
        elementBlock.forEach(function (elem, i) {
            elem.removeEventListener('mousedown', changeElementPosition);
            elem.removeEventListener('click', changeElementForm);
            elem.addEventListener('click', changeBackgroundColor);
        });
    }

    function transformElement() {
        elementBlock.forEach(function (elem, i) {
            elem.removeEventListener('mousedown', changeElementPosition);
            elem.removeEventListener('click', changeBackgroundColor);
            elem.addEventListener('click', changeElementForm);
        });
    }

    function moveElement() {
        elementBlock.forEach(function (elem, i) {
            elem.removeEventListener('click', changeBackgroundColor);
            elem.removeEventListener('click', changeElementForm);
            elem.addEventListener('mousedown', changeElementPosition);
        });
    }


    function changeElementPosition(e) {
        let obj = this;
        obj.className = "element-active";
        obj.style.position = "absolute";
        console.log(obj.style.left, obj.style.top);
        moveAt(e);

        function moveAt(e) {


            console.log("rgb(" + e.pageX/3 + "," + e.pageX/6 + "," + e.pageX/9 + ")");
            obj.style.borderColor = "rgb(" + e.pageX/10 + "," + e.pageY/5 + "," + (e.pageX+e.pageY)/10 + ")";
            obj.style.left = e.pageX - obj.offsetWidth / 2 + 'px';
            obj.style.top = e.pageY - obj.offsetHeight / 2 + 'px';
            console.log(obj.style.left);
            console.log(obj.style.top);

        }

        drawArea.onmousemove = function (e) {
            moveAt(e);
        };

        obj.onmouseup = function () {
            obj.style.zIndex = 1000;
            obj.className = 'element';
            drawArea.onmousemove = null;
            obj.onmouseup = null;

        };

    }


    function changeElementForm() {

        this.style.borderRadius = getRandom(1, 50) + '%';
        this.style.height = getRandom(30, 210) + 'px';
        this.style.width = getRandom(30, 210) + 'px';


    }

    function changeBackgroundColor() {

        this.style.background = window.getComputedStyle(currentColor).background;


    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    function changeCurrentColor() {
        if (currentColor.style.background === this.style.background) return 0;
        if (this === prevCol) {
            let swap;
            swap = prevCol.style.background;
            prevCol.style.background = currentColor.style.background;
            currentColor.style.background = swap;
            return 0;
        }
        prevCol.style.background = currentColor.style.background;
        currentColor.style.background = this.style.background;
    }


    function openBar() {

        if (chooseBar.style.display === "flex") {
            chooseBar.style.display = "none";
            console.log(this)
        } else chooseBar.style.display = "flex";


    }


    function setupColors() {
        currentColor.style.background = window.getComputedStyle(currentColor).background;
        brownCol.style.background = window.getComputedStyle(brownCol).background;
        gradientCol.style.background = window.getComputedStyle(gradientCol).background;
        blackCol.style.background = window.getComputedStyle(blackCol).background;
        greenCol.style.background = window.getComputedStyle(greenCol).background;
        magentaCol.style.background = window.getComputedStyle(magentaCol).background;
        prevCol.style.background = window.getComputedStyle(prevCol).background;
        redCol.style.background = window.getComputedStyle(redCol).background;
    }

    function setupColorElements() {
        colorElements.push(brownCol, gradientCol, redCol, blackCol, greenCol, magentaCol, prevCol);
    }

})();