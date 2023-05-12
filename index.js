var MathingGame = /** @class */ (function () {
    function MathingGame(cubes) {
        this.accomplishNum = 0;
        this.total_steps = 0;
        this.cubes = cubes;
    }
    MathingGame.prototype.clickCube = function (event) {
        var target = event.target;
        if (target.classList.contains('accomplish')) {
            return;
        }
        this.total_steps++;
        var step = document.querySelector('.game-message .step span');
        if (step) {
            step.textContent = this.total_steps.toString();
        }
        var num = target.dataset.num;
        if (this.preTarget && num == this.preTarget.dataset.num) {
            this.accomplishNum += 2;
            target.classList.add('accomplish');
            this.preTarget.classList.add('accomplish');
            if (this.cubes.length === this.accomplishNum) {
                console.log("congratulations!!");
                return;
            }
        }
        if (this.preTarget) {
            target.classList.add('active');
            var preTarget2_1 = this.preTarget;
            setTimeout(function () {
                target.classList.remove('active');
                preTarget2_1.classList.remove('active');
            }, 1000);
            this.preTarget = undefined;
        }
        else {
            this.cubes.forEach(function (e) { e.classList.remove('active'); });
            target.classList.add('active');
            this.preTarget = target;
        }
    };
    MathingGame.prototype.init = function () {
        var _this = this;
        for (var _i = 0, _a = this.cubes; _i < _a.length; _i++) {
            var cube = _a[_i];
            cube.addEventListener('click', function (event) { _this.clickCube(event); });
        }
        var array = this.getRandomArray(this.cubes.length);
        this.accomplishNum = 0;
        this.cubes.forEach(function (cube, index) {
            cube.dataset.num = array[index];
            // test
            cube.textContent = array[index];
        });
    };
    MathingGame.prototype.getRandomArray = function (size) {
        var limit = size / 2;
        var map = new Map();
        var arr = new Array(size);
        for (var i = 0; i < arr.length; i++) {
            var random = Math.floor(Math.random() * limit) + 1;
            var m_v = map.get(random);
            while (m_v && m_v >= 2) {
                random = Math.floor(Math.random() * limit) + 1;
                m_v = map.get(random);
            }
            if (!m_v) {
                arr[i] = random;
                map.set(random, 1);
            }
            else if (m_v < 2) {
                arr[i] = random;
                map.set(random, m_v + 1);
            }
        }
        return arr;
    };
    return MathingGame;
}());
var cubes = document.querySelectorAll('.content .cube');
var game = new MathingGame(cubes);
game.init();
