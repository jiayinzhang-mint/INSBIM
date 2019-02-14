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
          <v-flex xs12>
            <v-card>
              <v-container text-xs-center>
                <v-layout>
                  <v-flex xs3>
                    <v-card-text>
                      <h4 class="grey--text">大楼</h4>
                    </v-card-text>
                    <v-card-text>
                      <div class="dim-headline text-uppercase font-weight-regular">{{block.name}}</div>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs3>
                    <v-card-text>
                      <h4 class="grey--text">楼层</h4>
                    </v-card-text>
                    <v-card-text>
                      <div
                        class="dim-headline text-uppercase font-weight-regular"
                      >{{storey.floor}} F</div>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-container>
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
      scene: null,
      block: { name: "" },
      storey: { floor: "" }
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
    async getBuildingInfo() {
      this.block = this.blockList.find(e => {
        return e._id == this.$route.params.blockId;
      });
      var blockAlt = this.storeyList.find(e => {
        return e.key == this.$route.params.blockId;
      }).item;
      this.storey = blockAlt.find(e => {
        return e._id == this.$route.params.storeyId;
      });
      var floorArr = [];
      blockAlt.forEach(e => {
        floorArr.push(Number(e.floor));
      });
      this.floorNum = Math.max(...floorArr);
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
    this.getBuildingInfo();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getBuildingInfo();
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
