import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 目标：使用控制器实现鼠标操作旋转，缩放，平移相机

// 创建场景
const scene = new THREE.Scene();

// 创建相机-透视相机
// 参数1：视场角-75度，2：长宽比-屏幕宽高比，3：近截面，4：远截面
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质 - 使用 MeshBasicMaterial
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器 
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webgl渲染的canvas内容添加到body
// document.addEventListener('DOMContentLoaded', function () {
//     document.body.appendChild(renderer.domElement);
//     // 使用渲染器，通过相机将场景渲染进来
//     renderer.render(scene, camera);
// });

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 设置一个渲染函数
function render() {
    // 使用渲染器，通过相机将场景渲染进来
    renderer.render(scene, camera);
    // 渲染下一帧的时候再次调用render函数
    requestAnimationFrame(render);
}
document.addEventListener('DOMContentLoaded', function () {
    // 将webgl渲染的canvas内容添加到body
    document.body.appendChild(renderer.domElement);
    render();
})


