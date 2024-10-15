// 材质(Material)
// 基础网格材质(MeshBasicMaterial)

import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 目标：酷炫的三角形

// 创建场景
const scene = new THREE.Scene();

// 创建相机-透视相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 创建纹理加载器
const testureLoader = new THREE.TextureLoader();
// 加载纹理贴图
const doorColorTexture = testureLoader.load('./imgs/img.jpg');
// 纹理偏移
// doorColorTexture.offset.x = 0.5;
// doorColorTexture.offset.y = 0.5;
// doorColorTexture.offset.set(0.5, 0.5);
// 设置中心点
doorColorTexture.center.set(0.5, 0.5);
// 纹理旋转
// doorColorTexture.rotation = Math.PI / 4;

// 设置纹理的重复方式
doorColorTexture.repeat.set(2, 3);
// 水平方向重复方式
doorColorTexture.wrapS = THREE.RepeatWrapping;
// 垂直方向重复方式
doorColorTexture.wrapT = THREE.MirroredRepeatWrapping;


// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    map: doorColorTexture
});
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 将物体添加到场景中
scene.add(cube);


// 初始化渲染器 
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼 - 有惯性效果，还需要在动画循环里调用controls.update()
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

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

window.addEventListener('dblclick', () => {
    // 双击全屏
    // fullscreenElement可以获取到当前是哪个元素处于全屏状态
    if (!document.fullscreenElement) {
        renderer.domElement.requestFullscreen();
    } else {
        // 退出全屏
        document.exitFullscreen();
    }
    console.log(document.fullscreenElement);
})