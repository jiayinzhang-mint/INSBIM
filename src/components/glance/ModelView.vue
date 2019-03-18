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
    <v-layout row wrap>
      <v-flex xs12>
        <v-card flat class="transparent">
          <v-card-title>
            <div
              class="subheading text-uppercase font-weight-bold"
            >{{currentSelection?currentSelection.name:"请选择传感器"}}</div>
            <v-btn v-if="currentSelection" icon @click="showSensorInfo">
              <v-icon>info</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="zoomPlus">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn icon @click="zoomMinus">
              <v-icon>remove</v-icon>
            </v-btn>
            <v-btn icon @click="refreshScene">
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap>
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
                  <v-flex xs3>
                    <v-card-text>
                      <h4 class="grey--text">传感器</h4>
                    </v-card-text>
                    <v-card-text>
                      <div class="dim-headline text-uppercase font-weight-regular">{{poi.length}}</div>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs3>
                    <v-card-text>
                      <h4 class="grey--text">在线率</h4>
                    </v-card-text>
                    <v-card-text>
                      <div class="dim-headline text-uppercase font-weight-regular">100%</div>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <temperature></temperature>
          </v-flex>
          <v-flex xs6>
            <alert-list></alert-list>
          </v-flex>
          <v-flex xs6>
            <alert-processed></alert-processed>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-dialog v-model="sensorInfoDialog" width="400">
      <v-card>
        <v-card-title class="font-weight-bold text-uppercase">test
          <v-spacer></v-spacer>
          <v-btn icon @click="sensorInfoDialog=false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-title>
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
    </v-dialog>
  </v-container>
</template>

<script>
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import * as GUI from "babylonjs-gui";
import * as Materials from "babylonjs-materials";
import { mapGetters } from "vuex";

import temperature from "../section/storey/Temperature";
import alertList from "../section/storey/AlertList";
import alertProcessed from "../section/storey/AlertProcessed";

export default {
  components: {
    temperature: temperature,
    alertList: alertList,
    alertProcessed: alertProcessed
  },
  data() {
    return {
      canvas: null,
      engine: null,
      scene: null,
      block: { name: "" },
      storey: { floor: "" },
      camera: null,
      sensorInfoDialog: false,
      poi: [
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
      ],
      currentSelection: null
    };
  },
  methods: {
    async init() {
      this.canvas = document.getElementById("renderCanvas");
      this.engine = new BABYLON.Engine(this.canvas, true);
      // var loadingScreen = new customLoadingScreen("test");
      // this.engine.loadingScreen = loadingScreen;
      this.scene = await this.createScene();
      await this.createCamera(this.scene, this.canvas);
      await this.createLight(this.scene);
      await this.createModel(this.scene);
      await this.createUx(this.scene);
      this.engine.runRenderLoop(() => {
        this.scene.render();
      });
      window.addEventListener("resize", () => {
        this.engine.resize();
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
        60,
        BABYLON.Vector3.Zero(),
        scene
      );
      // limit zoom
      this.camera.lowerRadiusLimit = 5;
      this.camera.upperRadiusLimit = 60;
      this.camera.useBouncingBehavior = true;
      this.camera.attachControl(canvas, true);
    },
    async createLight(scene, canvas) {
      var light1 = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(1, 1, 0),
        scene
      );
      var light2 = new BABYLON.PointLight(
        "pointLight",
        new BABYLON.Vector3(1, 10, 1),
        scene
      );
      light2.intensity = 0.15;
    },
    async createModel(scene, canvas) {
      var newScene = await BABYLON.SceneLoader.AppendAsync("", "1.gltf", scene);
      console.log(newScene.meshes);
      var redMat = new BABYLON.StandardMaterial("redMat", scene);
      redMat.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
      newScene.meshes.forEach(e => {
        e.material = redMat;
        e.material.backFaceCulling = false;
      });
    },
    async createUx(scene) {
      // Create the 3D UI manager
      var poi = this.poi;
      var center = [121.3, 31.5];
      var manager = new BABYLON.GUI.GUI3DManager(scene);
      // Let's add a button
      var button = new BABYLON.GUI.Button3D("reset");
      var buttonList = [];
      poi.forEach((v, index) => {
        var button = new BABYLON.GUI.HolographicButton("orientation");
        manager.addControl(button);
        // add control must be ahead of position settings
        button.position.x = ((v[0] - center[0]) / 0.0262) * 25;
        button.position.z = ((v[1] - center[1]) / 0.0262) * 25;
        button.position.y = 3;
        button.text = "传感器";
        button.name = "test";

        // click event
        button.onPointerUpObservable.add(() => {
          // set target to the object
          this.camera.setTarget(
            new BABYLON.Vector3(
              button.position.x,
              button.position.y,
              button.position.z
            )
          );
          // set distance to the target
          this.camera.radius = 5;
          // select
          this.currentSelection = button;
        });
      });
    },
    async refreshScene() {
      // reset camera
      this.camera.setTarget(new BABYLON.Vector3.Zero());
      this.camera.radius = 60;
      this.camera.alpha = -Math.PI / 2;
      this.camera.beta = Math.PI / 3;

      // reset selection
      this.currentSelection = null;
    },
    async zoomPlus() {
      this.camera.radius -= 10;
    },
    async zoomMinus() {
      this.camera.radius += 10;
    },
    showSensorInfo() {
      this.sensorInfoDialog = true;
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
    setTimeout(() => {
      this.engine.resize();
    }, 500);
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getBuildingInfo();
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
