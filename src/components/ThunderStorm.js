import React, { Component } from "react";
import * as THREE from "three";
import cloudpic from './smoke3.png'

class ThunderStorm extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.cloudParticles = [];

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    this.renderer.setClearColor(this.scene.fog.color);
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 1;
    this.camera.rotation.x = 1.16;
    this.camera.rotation.y = -0.12;
    this.camera.rotation.z = 0.27;

    const ambient = new THREE.AmbientLight(0x555555);
    this.scene.add(ambient);
    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    this.scene.add(directionalLight);

    this.flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    this.flash.position.set(200, 300, 100);
    this.scene.add(this.flash);

    this.addModels();
    this.renderScene();
    this.start();
  }
  
  addModels() {
    this.vertex = new THREE.Vector3();
    const count = 15000;
    this.vertices = [];
    
    for(let i=0; i< count; i++) {
      this.vertices.push(
        Math.random() * 400 -200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200,
        Math.random() * 400 - 200
        ) 
      };
      
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.vertices)
    this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( this.vertices, 4 ) )


    this.rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.008,
        transparent: true,
    });
    
    this.rain = new THREE.Points(this.geometry, this.rainMaterial);
    this.scene.add(this.rain)




    new THREE.TextureLoader().load(

      cloudpic,
      texture => {
        let cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        let cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });
        for (let p = 0; p < 25; p++) {
          let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(
            Math.random() * 800 - 400, 500,
            Math.random() * 500 - 450
          )
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random() * 360;
          cloud.material.opacity = 0.6;
          this.cloudParticles.push(cloud);
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

    this.animate()
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
    this.cloudParticles.forEach(p => {
      p.rotation.z -= 0.002
    });

    this.positionAttribute = this.rain.geometry.getAttribute( 'position' );

    for ( let i = 0; i < this.positionAttribute.count; i++ ) {
      this.vertex.fromBufferAttribute( this.positionAttribute, i);

      this.vertex.y -= 1;
      if (this.vertex.y < -200) {
        this.vertex.y = 200;
      }
      this.positionAttribute.setXYZ(i, this.vertex.x, this.vertex.y, this.vertex.z)

    }

    this.positionAttribute.needsUpdate = true;

      //     console.log(p)
      //     p.velocity -= 0.1 + Math.random() * 0.1;
      //     p.y += p.velocity;
      //     if (p.y < -200) {
      //       p.y = 200;
      //       p.velocity = 0;

      // this.rain.rotation.y += 0.002;
      // this.points.needsUpdate = true;

      

      if (Math.random() > 0.93 || this.flash.power > 100) {
        if (this.flash.power < 100)
          this.flash.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
          )
        this.flash.power = 50 + Math.random() * 500;
      }
      this.renderScene(this.scene, this.camera);
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
  export default ThunderStorm;
