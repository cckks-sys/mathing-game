class MathingGame {
    public cubes: NodeListOf<HTMLElement>;
    public preTarget: HTMLElement | undefined;
    public accomplishNum: number = 0;
    public total_steps: number = 0;
    constructor(cubes: NodeListOf<HTMLElement>) {
        this.cubes = cubes;
    }
    clickCube(event: Event) {
        let target = event.target as HTMLElement;
        if (target.classList.contains('accomplish')) {
            return;
        }
        this.total_steps++;
        var step = document.querySelector('.game-message .step span');
        if(step){
            step.textContent = this.total_steps.toString();
        }
        let num = target.dataset.num as string;
        if (this.preTarget && num == this.preTarget.dataset.num) {
            this.accomplishNum += 2;
            target.classList.add('accomplish');
            this.preTarget.classList.add('accomplish');
            if (this.cubes.length === this.accomplishNum) {
                console.log("congratulations!!")
                return;
            }
        }
        if (this.preTarget) {
            target.classList.add('active');
            let preTarget2 = this.preTarget;
            setTimeout(() => {
                target.classList.remove('active');
                preTarget2.classList.remove('active');
            }, 1000);
            this.preTarget = undefined;
        } else {
            this.cubes.forEach(e => { e.classList.remove('active') })
            target.classList.add('active');
            this.preTarget = target;
        }
    }
    init() {
        for (const cube of this.cubes) {
            cube.addEventListener('click', (event) => { this.clickCube(event) });
        }
        var array = this.getRandomArray(this.cubes.length);
        this.accomplishNum = 0;
        this.cubes.forEach((cube, index) => {
            (cube as HTMLElement).dataset.num = array[index];
            // test
            (cube as HTMLElement).textContent = array[index];
        });
    }
    getRandomArray(size: number) {
        let limit = size / 2;
        let map = new Map<number, number>();
        let arr = new Array(size);
        for (let i = 0; i < arr.length; i++) {
            let random = Math.floor(Math.random() * limit) + 1;
            let m_v = map.get(random);
            while (m_v && (m_v as number) >= 2) {
                random = Math.floor(Math.random() * limit) + 1;
                m_v = map.get(random);
            }
            if (!m_v) {
                arr[i] = random;
                map.set(random, 1);
            } else if ((m_v as number) < 2) {
                arr[i] = random;
                map.set(random, m_v + 1);
            }
        }
        return arr;
    }
}
var cubes = document.querySelectorAll('.content .cube') as NodeListOf<HTMLElement>;

let game = new MathingGame(cubes);

game.init();
