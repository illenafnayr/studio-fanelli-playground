<template>
  <div>
    <!-- Your other content -->
    <!-- <Canvas /> -->
    <!-- <AudioVue /> -->
    <!-- <Home /> -->
    <!-- <FlowField /> -->
    <Maze />
  </div>
</template>

<script>
// import Home from './components/Home.vue';
// import Canvas from './components/Canvas.vue';
// import FlowField from './components/flowfield/FlowField.vue';
import Maze from './components/maze/Maze.vue';
// import AudioVue from './components/audio/AudioVue.vue';

export default {
  components: {
    // Canvas,
    // AudioVue,
    // Home,
    // FlowField,
    Maze,
  },
  data() {
    return {

    }
  }
};
</script>