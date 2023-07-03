<template>
  <div>
    <canvas id="homeCanvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "HomeVue",
  components: {},
  data() {
    return {};
  },
  mounted() {
    const canvas = document.getElementById("homeCanvas");
    const ctx = canvas.getContext("2d");
    // window.devicePixelRatio=1;
    window.devicePixelRatio = 12;
    const size = 150;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    const scale = window.devicePixelRatio;

    canvas.width = Math.floor(size * scale);
    canvas.height = Math.floor(size * scale);

    ctx.scale(scale, scale);
    ctx.font = "10px Courier";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let x = size / 2;
    let y = size / 2;

    let fanelliX = x;
    let fanelliY = y;
    let innovateX = x;
    let innovateY = y + 10;
    let designX = x;
    let designY = y + 20;
    let developX = x;
    let developY = y + 30;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText("Studio Fanelli", fanelliX, fanelliY);
      ctx.fillText("Innovate", innovateX, innovateY);
      ctx.fillText("Develop", developX, developY);
      ctx.fillText("Design", designX, designY);

    //   fanelliX++;
      requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener("scroll", () => {
      let value = window.scrollY;
      console.log(value);

      if (value > 0) {
        fanelliY = fanelliX - value * 1.5;
        innovateY = innovateX - value * 1;
        designY = designY + value * 0.25;
        developY = developY + value * 0.5;
      } else if (value === 0) {
        innovateY = size / 2 + 10;
        designY = size / 2 + 20;
        developY = size / 2 + 30;
      }
    });
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  /* box-sizing: border-box; */
  font-family: "Poppins", sans-serif;
  scroll-behavior: smooth;
}
#homeCanvas {
  /* border: 2px solid gold; */
  top: 50%;
  left: 50%;
}
</style>