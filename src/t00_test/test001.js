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
const testureLoader = new THREE.TextureLoader();

// 添加物体
// 创建几何体1
const stonesGeometry = new THREE.BoxGeometry(2, 4, 6);
// 设置位置
stonesGeometry.translate(1, 2, 3);
// 加载 石头的 纹理贴图
const stonesColorTexture = testureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_Color.png');
// 加载 石头的 环境遮挡贴图
const stonesAoTesture = testureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_AmbientOcclusion.png')
// 加载aplha透明度贴图
// const stonesAplhaTexture = testureLoader.load('');
// 基础网格材质
const stonesMaterial = new THREE.MeshBasicMaterial({
    map: stonesColorTexture // 设置纹理贴图
    // , transparent: true // 开启透明度
    // , opacity: 0.9 // 设置透明度
    , aoMap: stonesAoTesture // 设置环境遮挡贴图 aomap需要开启第二组uv
    , aoMapIntensity: 1 // 设置环境遮挡贴图强度

})
// 环境遮挡贴图-设置第二组uv
stonesGeometry.setAttribute('uv2', new THREE.BufferAttribute(stonesGeometry.attributes.uv.array, 2));
const stones = new THREE.Mesh(stonesGeometry, stonesMaterial);
scene.add(stones);



// 创建几何体2
const groundGeometry = new THREE.BoxGeometry(2, 4, 6);
groundGeometry.translate(4, 2, 3); // 设置位置
const groundColorTesture = testureLoader.load('./imgs/Ground037_1K-PNG/Ground037_1K-PNG_Color.png');
const groundAoTesture = testureLoader.load('./imgs/Ground037_1K-PNG/Ground037_1K-PNG_AmbientOcclusion.png')
const groundMaterial = new THREE.MeshBasicMaterial({
    map: groundColorTesture 
    , aoMap: groundAoTesture 
    , aoMapIntensity: 1
})
groundGeometry.setAttribute('uv2', new THREE.BufferAttribute(groundGeometry.attributes.uv.array, 2));
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(ground);


// 创建一个平面
// const planeGeometry = new THREE.PlaneGeometry(5, 5); // 创建一个平面几何体
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }); // 创建一个基础材质
// const plane = new THREE.Mesh(planeGeometry, planeMaterial); // 创建一个网格
// plane.rotation.x = Math.PI / 2;
// plane.position.y = 0.1;

// 设置纹理贴图
// plane.material.map = doorColorTexture;

// scene.add(plane);




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