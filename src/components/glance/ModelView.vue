<template>
  <v-card>
    <v-responsive :aspect-ratio="16/9">
      <canvas id="renderCanvas"></canvas>
    </v-responsive>
  </v-card>
</template>

<script>
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import * as Materials from "babylonjs-materials";
export default {
  data() {
    return {};
  },
  methods: {
    init() {
      const canvas = document.getElementById("renderCanvas");
      var engine = new BABYLON.Engine(canvas, true);

      var createScene = () => {
        var scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.ArcRotateCamera(
          "Camera",
          Math.PI / 2,
          Math.PI / 2,
          2,
          BABYLON.Vector3.Zero(),
          scene
        );
        camera.attachControl(canvas, true);

        var light1 = new BABYLON.HemisphericLight(
          "light1",
          new BABYLON.Vector3(1, 1, 0),
          scene
        );

        var sphere = BABYLON.MeshBuilder.CreateSphere(
          "sphere",
          { diameter: 1 },
          scene
        );

        return scene;
      };

      var scene = createScene();

      engine.runRenderLoop(() => {
        scene.render();
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
