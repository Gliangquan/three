import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// 创建场景
const scene = new THREE.Scene();

// 创建相机-透视相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 创建灯光
// 创建一个环境光 没有阴影
const light = new THREE.AmbientLight(0xffffff, 0.5); // 强度: 0.5
scene.add(light);

// 创建一个球体
const geometry = new THREE.SphereGeometry(0.5, 32, 32); // 球体 0.5 半径 32 32个分段 32个纬度 32个经度
const metalMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));
const sphere = new THREE.Mesh(geometry, metalMaterial);
sphere.position.set(1, 1, 1);   
sphere.castShadow = true; // 开启阴影
scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;  // 地面接收阴影
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
scene.add(plane);

// 创建一个聚光灯 有阴影
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.intensity = 100;
spotLight.position.set(3,3,3);
spotLight.castShadow = true;
spotLight.angle = Math.PI / 6;
spotLight.target = sphere;  // 将聚光灯目标设置为球体
scene.add(spotLight);  // 将目标添加到场景
var spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

// spotLight = new THREE.SpotLight( 0xffffff, 100 );
// spotLight.position.set( 2.5, 5, 2.5 );
// spotLight.angle = Math.PI / 6;
// spotLight.penumbra = 1;
// spotLight.decay = 2;
// spotLight.distance = 0;
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// spotLight.shadow.camera.near = 1;
// spotLight.shadow.camera.far = 10;
// spotLight.shadow.focus = 1;
// scene.add( spotLight );

// lightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( lightHelper );


// 初始化渲染器 
const renderer = new THREE.WebGLRenderer();
// 设置阴影渲染
renderer.shadowMap.enabled = true;
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// 设置一个渲染函数 
function render() {
    // 让控制器一直更新
    controls.update()
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

// 页面监听窗口大小变化，更新渲染器大小和相机投影矩阵
window.addEventListener('resize', () => {
    // 更新渲染器大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 更新相机投影矩阵
    camera.aspect = window.innerWidth / window.innerHeight;
    // 手动更新相机的投影矩阵
    camera.updateProjectionMatrix();
    // 使用渲染器的像素比例尺设置
    renderer.setPixelRatio(window.devicePixelRatio);
})
