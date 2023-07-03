<template>
	<div>
		<canvas id="flowFieldCanvas"></canvas>
	</div>
</template>

<script>
import { FlowEffect } from "./FlowEffect.js";
export default {
	components: {},
	mounted() {
		const canvas = document.getElementById("flowFieldCanvas");
		const ctx = canvas.getContext("2d");

		canvas.width = 1500;
		canvas.height = 500;

		const effect = new FlowEffect(canvas, ctx);
		//canvas settings
		ctx.fillStyle = "#fff";
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 1;
		ctx.lineCap = "round";

		function animate() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			effect.render(ctx);
			requestAnimationFrame(animate);
		}
		animate();
	},
	data() {
		return {};
	},
};
</script>
<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

canvas {
	background: black;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>