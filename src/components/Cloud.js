import React, { Component } from "react";
import * as THREE from "three";
import cloudpic from './smoke3.png'

class Cloud extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    this.renderer.setClearColor(this.scene.fog.color);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 1;
    this.camera.rotation.x = 1.16;
    this.camera.rotation.y = -0.12;
    this.camera.rotation.z = 0.27;

    const ambient = new THREE.AmbientLight(0x555555);
    this.scene.add(ambient);
    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0,0,1);
    this.scene.add(directionalLight);

    this.addModels();

    this.renderScene();
    this.start();
  }
  
  addModels() {
    new THREE.TextureLoader().load(
    
      cloudpic,
      texture => {
        let cloudGeo = new THREE.PlaneBufferGeometry(500,500);
        let cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });
        for(let p = 0; p < 25; p++) {
          let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(
            Math.random()*800 - 400, 500,
            Math.random()*500-450
          )
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random()*360;
          cloud.material.opacity = 0.6;
          this.scene.add(cloud);
        }
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      error => {
        console.log("An error happened" + error);
      }
    );



    // var mtlLoader = new MTLLoader();
    // mtlLoader.setBaseUrl("./assets/");
    // mtlLoader.load("freedom.mtl", materials => {
    //   materials.preload();
    //   console.log("Material loaded");
    //   var objLoader = new OBJLoader();
    //   objLoader.setMaterials(materials);
    //   objLoader.load(
    //     "./assets/freedom.obj",
    //     object => {
    //       this.freedomMesh = object;
    //       this.freedomMesh.position.setY(3);
    //       this.freedomMesh.scale.set(0.02, 0.02, 0.02);
    //       this.scene.add(this.freedomMesh);
    //     },
    //     xhr => {
    //       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //     },
    //     error => {
    //       console.log("An error happened" + error);
    //     }
    //   );
    // });
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    // let cloudParticles = []

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
export default Cloud;
