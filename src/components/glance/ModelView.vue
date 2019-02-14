<template>
  <v-container grid-list-lg>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-responsive :aspect-ratio="16/9">
            <canvas id="renderCanvas"></canvas>
          </v-responsive>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-layout>
          <v-flex xs3>
            <v-card>
              <v-card-title>所在楼层</v-card-title>
              <v-card-text class="display-1">1F</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import * as Materials from "babylonjs-materials";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      canvas: null,
      engine: null,
      scene: null
    };
  },
  methods: {
    async init() {
      this.canvas = document.getElementById("renderCanvas");
      this.engine = new BABYLON.Engine(this.canvas, true);
      this.scene = await this.createScene();
      await this.createCamera(this.scene, this.canvas);
      await this.createLight(this.scene);
      await this.createModel(this.scene);
      this.engine.runRenderLoop(() => {
        this.scene.render();
      });
    },
    async createScene() {
      var scene = new BABYLON.Scene(this.engine);
      return scene;
    },
    async createCamera(scene, canvas) {
      var camera = new BABYLON.ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 2,
        2,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);
    },
    async createLight(scene, canvas) {
      var light1 = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(1, 1, 0),
        scene
      );
      return light1;
    },
    async createModel(scene, canvas) {
      var sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.5 },
        scene
      );
    }
  },
  computed: {
    ...mapGetters({
      deviceList: "device/deviceList",
      blockList: "building/blockList",
      storeyList: "building/storeyList"
    })
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
