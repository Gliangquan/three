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
scene.background = new THREE.Color(0xff0000);
scene.add(camera);

// 添加环境光
const light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);


// 创建材质
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load( './imgs/satrt/circle_05.png');

const vertices = []; // 存放顶点数据
for ( let i = 0; i < 1000; i ++ ) {
    const x = THREE.MathUtils.randFloatSpread(20);
    const y = THREE.MathUtils.randFloatSpread(20);
    const z = THREE.MathUtils.randFloatSpread(20);
    vertices.push( x, y, z );
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
const material = new THREE.PointsMaterial({ 
    color: 0xffffff
    , map: texture // 贴图
    , transparent: true // 开启透明
    , size: 0.5 // 点的大小
    , sizeAttenuation: true // 点的大小是否受相机深度影响
    , alphaMap: texture // 透明贴图
    , alphaTest: 0.1    // 透明贴图阈值
    , blending: THREE.AdditiveBlending // 混合模式
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
