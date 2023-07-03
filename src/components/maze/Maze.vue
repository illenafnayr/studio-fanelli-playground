<template>
	<div>
		<canvas id="mazeCanvas"></canvas>
	</div>
</template>
  
<script>
import { User } from './User';



export default {
	name: "MazeVue",
	components: {
	},
	data() {
		return {
		}
	},
	mounted() {
		const canvas = document.getElementById('mazeCanvas');
		const ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		const user = new User(canvas.width, canvas.height, ctx);
		console.log(user);
		// function animate() {
		// 	// ctx.clearRect(0,0,canvas.width, canvas.height);
		// 	// maze.drawMaze();
		// 	requestAnimationFrame(animate)
		// }
		// animate();
	}
};
</script>
<style>
body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

#mazeCanvas {
	position: absolute;
}

</style>