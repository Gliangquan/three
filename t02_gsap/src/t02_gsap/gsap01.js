import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 导入Gsap动画库
import gsap from 'gsap';

// 目标：使用gsap库实现动画效果，增加阻尼效果，监听窗口变化，设置动画暂停、恢复、反转、重置

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

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼 - 有惯性效果，还需要在动画循环里调用controls.update()
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置动画 
/**
 * duration: 动画持续时间
 * repeat: 动画重复次数 -1表示无限循环
 * yoyo: 是否往返运动
 * onStart: 动画开始回调
 * onComplete: 动画完成回调
 * ease: 动画缓动效果
 */
const animate1 = gsap.to(cube.position, {
    x: 5, duration: 5, repeat: -1, yoyo: true, ease: "power1.inOut"
    , onStart: () => {
        console.log('动画开始');
    }
    , onComplete: () => {
        console.log('动画完成');
    }
});

// const animate2 = gsap.to(cube.rotation, { x: Math.PI * 2, duration: 5, repeat: -1, yoyo: true });

window.addEventListener('dblclick', () => {
    console.log(animate1)
    // 暂停动画
    // animate1.pause();
    // 恢复动画
    // animate1.resume();
    // 反转动画
    // animate1.reverse();
    // 重置动画
    // animate1.restart();

    if (animate1.isActive()) {
        animate1.pause();
    }else {
        animate1.play();
    }
})

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
    camera.updateProjectionMatrix();
})