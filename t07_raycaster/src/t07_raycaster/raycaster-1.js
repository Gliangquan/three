import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 目标：

// 创建场景
const scene = new THREE.Scene();

// 创建相机-透视相机
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000);

// 设置相机位置
camera.position.set(0, 0, 18);
scene.add(camera);

// 添加环境光
const light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);

// 初始化渲染器 
const renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);


// --------------------------------------
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
        wireframe: true
    });
const redMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
})

// 1000个立方体
const cubeArr = [];
const cubeGropu = new THREE.Group();
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        for (let k = 0; k < 5; k++) {
            const cube = new THREE.Mesh(cubeGeometry, material);
            cube.position.set(i*2-5, j*2-5, k*2-5);
            cubeGropu.add(cube);
            cubeArr.push(cube);
        }
    }
}
scene.add(cubeGropu);

// 三角形
const triangleGroup = new THREE.Group();
for (let i = 0; i < 50; i++) {
    const geometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(9)
    for (let j = 0; j < 9; j++) {
        positionArray[j] = Math.random() * 10 - 5;
    }
    geometry.setAttribute(
        'position', new THREE.BufferAttribute(positionArray, 3)
    );
    let color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 });    
    const cube = new THREE.Mesh(geometry, material);
    triangleGroup.add(cube);
}
triangleGroup.position.set(0, -30, 0);
scene.add(triangleGroup);


const pointer = new THREE.Vector2();
function onPointerMove( event ) {
	// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    return pointer;
}

// 创建投射光线对象
const raycaster = new THREE.Raycaster();
window.addEventListener('click',(event)=>{
    mousePointer = onPointerMove(event)
    raycaster.setFromCamera(mousePointer, camera);
    raycaster.intersectObjects(cubeArr, true).forEach((item) => {
        console.log(item.object);
        item.object.material = redMaterial;
    })
})

// --------------------------------------

// 设置一个渲染函数 
const clock = new THREE.Clock();
function render() {
    let time = clock.getElapsedTime();
    cubeGropu.rotation.x = time*0.5;
    cubeGropu.rotation.y = time*0.5
    cubeGropu.rotation.z = time*0.5

    triangleGroup.rotation.x = time*0.5;
    triangleGroup.rotation.y = time*0.5
    triangleGroup.rotation.z = time*0.5

    let y = -(window.scrollY/window.innerHeight) * 25
    camera.position.y = y
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(renderer.domElement);
    render();
})

window.addEventListener('scroll', () => {
    console.log(window.scrollY);
    console.log(window.innerHeight);
    
})

// 页面监听窗口大小变化，更新渲染器大小和相机投影矩阵
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
})
