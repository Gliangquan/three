// 材质(Material)
// 基础网格材质(MeshBasicMaterial)

import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 目标：

// 创建场景
const scene = new THREE.Scene();

// 创建相机-透视相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
// scene.background = new THREE.Color(0xff0000);
scene.add(camera);

// 添加环境光
const light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);
// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(0, 0, 10);
scene.add(directionalLight);


// 创建材质
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load( './imgs/satrt/circle_05.png');


const count = 2000;
const positions = new Float32Array(count * 3); // 设置缓冲区数组
const colors = new Float32Array(count * 3); // 设置颜色数组

for ( let i = 0; i < count * 3; i ++ ) {
    positions[i] = (Math.random() - 0.5) * 40;
    colors[i] = Math.random(); // 随机颜色
}

// 创建 BufferGeometry 并设置位置和颜色属性
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));


const material = new THREE.PointsMaterial({ 
    map: texture, 
    size: 0.2, 
    sizeAttenuation: true, 
    depthWrite: false, 
    blending: THREE.AdditiveBlending, 
    vertexColors: true // 使用顶点颜色
});
const points = new THREE.Points(geometry, material);
scene.add( points );


// 初始化渲染器 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置一个渲染函数 
function render() {
    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

document.addEventListener('DOMContentLoaded', function () {
    // 将webgl渲染的canvas内容添加到body
    document.body.appendChild(renderer.domElement);
    render();
})

// 页面监听窗口大小变化，更新渲染器大小和相机投影矩阵
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
})
