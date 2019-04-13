<template>
  <v-container fluid grid-list-lg>
    <v-layout>
      <v-flex xs12>
        <v-layout>
          <v-flex xs12>
            <v-toolbar flat class="transparent">
              <v-btn icon :to="'/inbox'">
                <v-icon>arrow_back</v-icon>
              </v-btn>
              <v-toolbar-title>告警</v-toolbar-title>
            </v-toolbar>
            <v-card>
              <v-container text-xs-center>
                <v-layout>
                  <v-flex xs3>
                    <v-card-text>
                      <h4 class="grey--text">大楼</h4>
                    </v-card-text>
                    <v-card-text>
                      <div class="dim-headline text-uppercase font-weight-regular">MAIN</div>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs3>
                    <v-card-text>
                      <h4 class="grey--text">楼层</h4>
                    </v-card-text>
                    <v-card-text>
                      <div class="dim-headline text-uppercase font-weight-regular">12 F</div>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs3>
                    <v-card-text>
                      <h4 class="grey--text">传感器</h4>
                    </v-card-text>
                    <v-card-text>
                      <div class="dim-headline text-uppercase font-weight-regular">1</div>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs3>
                    <v-card-text>
                      <h4 class="grey--text">在线率</h4>
                    </v-card-text>
                    <v-card-text>
                      <div class="dim-headline text-uppercase font-weight-regular">%</div>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs8>
            <v-card>
              <v-responsive :aspect-ratio="16/9">
                <canvas id="renderCanvas"></canvas>
              </v-responsive>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-card-title class="subheading">告警信息</v-card-title>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title style="max-width:200px" class="body-2">告警类型</v-list-tile-title>
                      <v-list-tile-content class="body-2">温度超标</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-title style="max-width:200px" class="body-2">告警时间</v-list-tile-title>
                      <v-list-tile-content class="body-2">2019-03-16 10:35:08</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-title class="subheading">传感器信息</v-card-title>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title style="max-width:200px" class="body-2">类型</v-list-tile-title>
                      <v-list-tile-content class="body-2">温度传感器</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-title style="max-width:200px" class="body-2">安装时间</v-list-tile-title>
                      <v-list-tile-content class="body-2">2019-02-10 14:05:29</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-title style="max-width:200px" class="body-2">电量</v-list-tile-title>
                      <v-list-tile-content class="body-2">76%</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-title style="max-width:200px" class="body-2">信号强度</v-list-tile-title>
                      <v-list-tile-content class="body-2">-82 dBm</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
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
import { setTimeout } from "timers";
export default {
  data() {
    return {
      canvas: null,
      engine: null,
      scene: null,
      block: { name: "" },
      storey: { floor: "" },
      poi: [[121.30664994046971, 31.483097943677663]],
      camera: null
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
      await this.createUx(this.scene);
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
      var url = "/img/scene.jpg";
      var background = new BABYLON.Layer("back", url, scene);
      background.isBackground = true;
      return scene;
    },
    async createCamera(scene, canvas) {
      this.camera = new BABYLON.ArcRotateCamera(
        "Camera",
        -Math.PI / 2,
        Math.PI / 3,
        10,
        BABYLON.Vector3.Zero(),
        scene
      );
      // this.camera.lowerRadiusLimit = 23;
      // this.camera.upperRadiusLimit = 23;
      // this.camera.useBouncingBehavior = true;
      this.camera.attachControl(canvas, true);
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
      var newScene = await BABYLON.SceneLoader.AppendAsync("", "1.gltf", scene);
      var redMat = new BABYLON.StandardMaterial("redMat", scene);
      redMat.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
      newScene.meshes.forEach(e => {
        e.material = redMat;
        e.material.backFaceCulling = false;
      });
    },
    async createUx(scene) {
      // Create the 3D UI manager
      var manager = new BABYLON.GUI.GUI3DManager(scene);
      var poi = this.poi;
      var center = [121.3, 31.5];

      // Let's add a button
      var buttonList = [];
      poi.forEach((v, index) => {
        var button = new BABYLON.GUI.HolographicButton("orientation");
        manager.addControl(button);
        // add control must be ahead of position settings
        button.position.x = ((v[0] - center[0]) / 0.0262) * 25;
        button.position.z = ((v[1] - center[1]) / 0.0262) * 25;
        button.position.y = 3;
        button.text = "告警";
        this.camera.setTarget(
          new BABYLON.Vector3(
            button.position.x,
            button.position.y,
            button.position.z
          )
        );
        this.camera.setPosition(
          new BABYLON.Vector3(
            button.position.x + 2,
            button.position.y + 1,
            button.position.z - 6
          )
        );
      });
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
    setTimeout(() => {
      this.engine.resize();
    }, 500);
  },
  beforeRouteUpdate(to, from, next) {
    next();
    setTimeout(() => {
      this.engine.resize();
    }, 500);
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


<style>
</style>
