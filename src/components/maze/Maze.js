const X = 'x';

export class Maze {
	constructor(width, height, ctx) {
		this.maze = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
			[1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
			[1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
			[1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[2, 0, X, 2, 0, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		];
		this.width = width;
		this.height = height;
		this.context = ctx;
		this.cellSize = Math.floor(this.width / this.maze[0].length);
		this.userX = null;
		this.userY = null;
		this.init();
		this.scale = 0.3;
	}

	init() {
		this.drawMaze();
	}

	drawMaze() {
		const cellSize = this.scale * this.cellSize
		for (let r = 0; r < this.maze.length; r++) {
			for (let c = 0; c < this.maze[r].length; c++) {
				const cell = this.maze[r][c];
				if (cell === 2) {
					this.context.fillStyle = 'red';
					this.context.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
				}
				if (cell === 1) {
					this.context.fillStyle = 'black';
					this.context.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
				} else if (cell === 0) {
					this.context.fillStyle = 'white';
					this.context.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
				} else if (cell === 'x') {
					this.userX = Math.round(c * this.cellSize + Math.floor(this.cellSize / 2));
					this.userY = Math.round(r * this.cellSize + Math.floor(this.cellSize / 2));
				}
			}
		}
	}

	update() {
		console.log('update maze');
	}
}
