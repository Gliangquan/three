import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 导入Gsap动画库
import gsap from 'gsap';
// 导入GUI
import * as dat from 'dat.gui';

// 目标：增加变量调节GUI，实现动画效果

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

// 添加GUI 控制 
const gui = new dat.GUI();
gui.add(cube.position, 'x').min(0).max(5).step(0.01).name('立方体X位置').onChange(() => {
  console.log('修改了x', cube.position.x)  
})
;
gui.add(cube.position, 'y').min(0).max(5).step(0.01).name('立方体Y位置').onFinishChange(() => {
    console.log('修改完成了Y')
  });
gui.add(cube.position, 'z').min(0).max(5).step(0.01).name('立方体Z位置');
// 设置动画暂停
gui.add({ pause: () => { animate1.paused(!animate1.paused()) } }, 'pause').name('暂停/继续'); 
// 修改物体颜色
const param = {
    color: '#ff0000'
}
gui.addColor(param, 'color').name('立方体颜色').onChange((value) => {
  cube.material.color.set(value);
  console.log('修改了立方体颜色', value)  
});
gui.add(cube, "visible").name('是否显示').onChange((value) => {
    console.log('修改了立方体显示状态', value)
})
// 设置按钮点击触发事件
gui.add({ change: () => { cube.scale.set(2, 2, 2) } }, 'change').name('立方体放大');

const filed = gui.addFolder('立方体');
filed.add(cube.scale, 'x').min(0).max(5).step(0.01).name('立方体X缩放');
filed.add(cube.material, 'wireframe').name('线框显示');



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