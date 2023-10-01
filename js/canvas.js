import * as THREE from "three";
import animator from "./util";

var Canvas = {
	make: function(container, frame = ()=>{}) {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		const ambientLight = new THREE.AmbientLight(0x444444);
		scene.add(ambientLight);
		
		const directionalLight = new THREE.DirectionalLight(0x444444);
		scene.add(directionalLight);

		const renderer = new THREE.WebGLRenderer();
		window.addEventListener("resize", function() {	
			renderer.setSize(container.clientWidth, container.clientHeight);
		});
		window.dispatchEvent(new Event("resize"));
		container.appendChild(renderer.domElement);

		return {
			renderer: renderer,
			scene: scene,
			camera: camera,
			lights: {
				ambient: ambientLight,
				directional: directionalLight
			},
			animator: animator(function(delta) {
				renderer.render(scene, camera);
				frame(delta);
			})
		};
	},
};

export default Canvas;
