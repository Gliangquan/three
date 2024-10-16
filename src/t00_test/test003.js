import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 导入GUI调试器
import * as dat from 'dat.gui';


// 目标：基础网格材质(MeshBasicMaterial) ，这种材质不受光照的影响。
// 标准网格材质(MeshStandardMaterial)，就必须要要考虑光照的影响了。

// 设置阴影四步
// 1. 渲染器开启阴影渲染：renderer.shadowMap.enabled = true;
// 2. 相机开启阴影投射：castShadow
// 3. 灯光开启阴影投射：castShadow
// 4. 地面开启接收阴影：receiveShadow

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
// 创建一个平行光 有阴影
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(10, 15, 6);
// directionalLight.castShadow = true; // 开启阴影
// directionalLight.shadow.radius = 20; // 设置阴影模糊度
// directionalLight.shadow.mapSize.set(2048, 2048); // 设置阴影贴图尺寸
// 设置阴影贴图的相机参数
// directionalLight.shadow.camera.near = 0.5; // 设置阴影贴图的相机近端面  
// directionalLight.shadow.camera.far = 500; // 设置阴影贴图的相机远端面
// directionalLight.shadow.camera.top = 10; // 设置阴影贴图的相机上端面
// directionalLight.shadow.camera.bottom = -10; // 设置阴影贴图的相机下端面
// directionalLight.shadow.camera.left = -10; // 设置阴影贴图的相机左端面
// directionalLight.shadow.camera.right = 10; // 设置阴影贴图的相机右端面
// scene.add(directionalLight); 


// 创建纹理加载器
const textureLoader = new THREE.TextureLoader();

// 添加物体
// 创建几何体
const stonesGeometry = new THREE.BoxGeometry(2, 2, 6, 100, 100, 100); // 后三个参数是x,y,z方向上的分段数
// 设置位置
// stonesGeometry.translate(1, 1, 1.5);
// 加载 石头的 纹理贴图
const stonesColorTexture = textureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_Color.png');
// 加载 石头的 环境遮挡贴图
const stonesAoTesture = textureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_AmbientOcclusion.png');
// 加载 石头的 高度贴图
const stonesHeightTexture = textureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_Displacement.png');
// 加载 石头的 粗糙度贴图
const stonesRoughnessTexture = textureLoader.load('./imgs/PavingStones142_1K-PNG/PavingStones142_1K-PNG_Roughness.png');
// 加载aplha透明度贴图
// const stonesAplhaTexture = textureLoader.load('');
// 基础网格材质
const stonesMaterial = new THREE.MeshStandardMaterial({
    map: stonesColorTexture // 设置纹理贴图
    // , transparent: true // 开启透明度
    // , opacity: 0.9 // 设置透明度
    , aoMap: stonesAoTesture // 设置环境遮挡贴图 aomap需要开启第二组uv
    , aoMapIntensity: 1 // 设置环境遮挡贴图强度
    , displacementMap: stonesHeightTexture // 设置高度贴图
    , displacementScale: 0.05
    , roughnessMap: stonesRoughnessTexture // 设置粗糙度贴图
})
// 环境遮挡贴图-设置第二组uv
stonesGeometry.setAttribute('uv2', new THREE.BufferAttribute(stonesGeometry.attributes.uv.array, 2));
const stones = new THREE.Mesh(stonesGeometry, stonesMaterial);
stones.position.set(1, 1, 3);   
// 开启接收阴影 
stones.receiveShadow = true;
scene.add(stones);


// 创建平面
const planeGeometry = new THREE.PlaneGeometry(6, 6, 100, 100);
planeGeometry.rotateX(-Math.PI / 2); // 旋转平面
const groundColorTesture = textureLoader.load('./imgs/Ground081_1K-PNG/Ground081_1K-PNG_Color.png');
const groundAoTesture = textureLoader.load('./imgs/Ground081_1K-PNG/Ground081_1K-PNG_AmbientOcclusion.png')
const groundHightTexture = textureLoader.load('./imgs/Ground081_1K-PNG/Ground081_1K-PNG_Displacement.png');
const groundRoughnessTexture = textureLoader.load('./imgs/Ground081_1K-PNG/Ground081_1K-PNG_Roughness.png');
const groundMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide 
    , map: groundColorTesture 
    , aoMap: groundAoTesture 
    , aoMapIntensity: 1
    , displacementMap: groundHightTexture
    , displacementScale: 0.1
    , roughnessMap: groundRoughnessTexture
})
planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2));
const ground = new THREE.Mesh(planeGeometry, groundMaterial);
ground.position.set(3, 0, 3);
// 开启接收阴影 
ground.receiveShadow = true;
scene.add(ground);


// 创建一个球体
const geometry = new THREE.SphereGeometry(0.5, 32, 32); // 球体 0.5 半径 32 32个分段 32个纬度 32个经度
const metalColorTexture = textureLoader.load('./imgs/Metal049A_1K-PNG/Metal049A_1K-PNG_Color.png');
const metalAoTesture = textureLoader.load('./imgs/Metal049A_1K-PNG/Metal049A_1K-PNG_AmbientOcclusion.png');
const metalHightTexture = textureLoader.load('./imgs/Metal049A_1K-PNG/Metal049A_1K-PNG_Displacement.png');
const metalRoughnessTexture = textureLoader.load('./imgs/Metal049A_1K-PNG/Metal049A_1K-PNG_Roughness.png');
const metalMaterial = new THREE.MeshStandardMaterial({
    map: metalColorTexture
    , aoMap: metalAoTesture
    , aoMapIntensity: 1
    , displacementMap: metalHightTexture
    , displacementScale: 0.05
    , roughness: 1 // 粗糙度0-光滑 1-粗糙
    , roughnessMap: metalRoughnessTexture
})

geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));
const sphere = new THREE.Mesh(geometry, metalMaterial);
sphere.position.set(3, 1.5, 3);   
// 开启阴影
sphere.castShadow = true;
scene.add(sphere);


// 创建一个聚光灯 有阴影
// 3,创建灯光对象
var spotLight = new THREE.SpotLight(0xff0000, 100); // 红色是
spotLight.position.set(5,5,5);
spotLight.castShadow = true;
spotLight.angle = Math.PI / 6;
spotLight.distance = 20;
spotLight.target = sphere;
scene.add( spotLight );
var spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

// 加载环境贴图
// const envTexture = textureLoader.load('./imgs/sunset.jpg');
// scene.environment = envTexture;

// 初始化渲染器 
const renderer = new THREE.WebGLRenderer();
// 设置阴影渲染
renderer.shadowMap.enabled = true;
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼 - 有惯性效果，还需要在动画循环里调用controls.update()
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建GUI调试器
const gui = new dat.GUI();
gui.add(camera.position, 'x').min(-5).max(5).step(0.01).name('相机x坐标');
// 设置球体位置
gui.add(sphere.position, 'x').min(-5).max(5).step(0.01).name('球体x坐标');
gui.add(sphere.position, 'y').min(-5).max(5).step(0.01).name('球体y坐标');
// // 设置灯光位置
// gui.add(directionalLight.shadow.camera, 'near').min(0).max(10).step(0.1).name('阴影相机近端面').onChange(() => {
//     directionalLight.shadow.camera.updateProjectionMatrix();
// })
// gui.add(directionalLight.shadow.camera, 'far').min(0).max(10).step(0.1).name('阴影相机远端面').onChange(() => {
//     directionalLight.shadow.camera.updateProjectionMatrix();
// })
// gui.add(directionalLight.shadow.camera, 'top').min(0).max(10).step(0.1).name('阴影相机上端面').onChange(() => {
//     directionalLight.shadow.camera.updateProjectionMatrix();
// })
// gui.add(directionalLight.shadow.camera, 'bottom').min(0).max(10).step(0.1).name('阴影相机下端面').onChange(() => {
//     directionalLight.shadow.camera.updateProjectionMatrix();
// })
// gui.add(directionalLight.shadow.camera, 'left').min(0).max(10).step(0.1).name('阴影相机左端面').onChange(() => {
//     directionalLight.shadow.camera.updateProjectionMatrix();
// })
// gui.add(directionalLight.shadow.camera, 'right').min(0).max(10).step(0.1).name('阴影相机右端面').onChange(() => {
//     directionalLight.shadow.camera.updateProjectionMatrix();
// })

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