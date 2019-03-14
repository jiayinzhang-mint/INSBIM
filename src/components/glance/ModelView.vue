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
import "babylonjs-loaders";
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
      window.addEventListener("resize", function() {
        engine.resize();
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
      BABYLON.SceneLoader.Append("", "1.gltf", scene, scene => {
        scene.createDefaultCameraOrLight(true, true, true);
      });

      var poi = [
        [121.30664994046971, 31.483097943677663],
        [121.29781812883381, 31.49993556801079],
        [121.31917818607218, 31.48782885656793],
        [121.29620392366265, 31.48893011040499],
        [121.27748128554705, 31.496392308719763],
        [121.32067270566228, 31.47569157016242],
        [121.2885182308401, 31.512842459284748],
        [121.28206734918749, 31.51664213767396],
        [121.31098301674274, 31.51656013961992],
        [121.32257192137907, 31.482600224024708]
      ];
      var center = [121.3, 31.5];

      poi.forEach(function(v) {
        var cube = BABYLON.Mesh.CreateBox("box", 1, scene, true);
        cube.position.x = ((v[0] - center[0]) / 0.0262) * 25;
        cube.position.z = ((v[1] - center[1]) / 0.0262) * 25;
        cube.position.y = 3;
      });

      // limit

      var box = BABYLON.Mesh.CreateBox(
        "box",
        1,
        scene,
        true,
        BABYLON.Mesh.DOUBLESIDE
      );
      box.position.y = 3;
      box.position.z = 26.2;
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
