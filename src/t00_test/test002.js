import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 目标：测试例子

// 创建场景
const scene = new THREE.Scene();

// 创建相机-透视相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);


// 创建纹理加载器
// const testureLoader = new THREE.TextureLoader();
// const doorColorTexture = testureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_Color.png');
// // 加载法线贴图
// const doorNormalTexture = testureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_NormalDX.png');
// // 加载粗糙度贴图
// const doorRoughnessTexture = testureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_Roughness.png');
// // 加载位移贴图
// const doorDisplacementTexture = testureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_Displacement.png');
// // 加载环境光遮蔽贴图
// const doorAmbientOcclusionTexture = testureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_AmbientOcclusion.png');

// 创建一个平面
const planeGeometry = new THREE.PlaneGeometry(5, 5); // 创建一个平面几何体
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }); // 创建一个基础材质
const plane = new THREE.Mesh(planeGeometry, planeMaterial); // 创建一个网格
plane.rotation.x = Math.PI / 2;
plane.position.y = 0.1;

// 设置纹理贴图
plane.material.map = doorColorTexture;

scene.add(plane);




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