// 材质(Material)
// 基础网格材质(MeshBasicMaterial)

import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 目标：漫天雪花

// 创建场景
const scene = new THREE.Scene();

// 创建相机-透视相机
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000);

// 设置相机位置
camera.position.set(0, 0, 10);
// scene.background = new THREE.Color(0xff0000);
scene.add(camera);

// 添加环境光
const light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);


function createSnow(url, size = 0.5){
    // 创建材质
    const textureLoader = new THREE.TextureLoader();
    // url就是地址
    const texture = textureLoader.load(url)

    const count = 3000;
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
        size: size, 
        sizeAttenuation: true, 
        depthWrite: false, 
        blending: THREE.AdditiveBlending, 
        vertexColors: true // 使用顶点颜色
    });
    const points = new THREE.Points(geometry, material);
    scene.add( points );
    return points;
}

const points1 = createSnow('./imgs/satrt/circle_05.png', 0.5);
const points2 = createSnow('./imgs/satrt/circle_01.png', 0.5);


// 初始化渲染器 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const clock = new THREE.Clock();
// 设置一个渲染函数 
function render() {
    let time = clock.getElapsedTime();
    points1.rotation.x = time * 0.1;
    points2.rotation.x = time * 0.5;
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
