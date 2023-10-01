import * as THREE from "three";

var Canvas = {
	make: function(container, frame = ()=>{}) {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		const ambientLight = new THREE.AmbientLight(0x444444);
		scene.add(ambientLight);

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
			animator: Canvas.animator(function(delta) {
				renderer.render(scene, camera);
				frame(delta);
			})
		};
	},
	animator: function(fn) {
		let animator = {
			_stopped: false,
			_last: Date.now(),
			stop: function() {
				animator._stopped = true;
			},
			start: function() {
				animator._stopped = false;
				animator.tick();
			},
			tick: function() {
				let now = Date.now();
				fn(now - animator._last);
				animator._last = now;

				window.requestAnimationFrame(() => animator.tick());
			}
		};

		animator.tick();
		return animator;
	}
};

export default Canvas;

