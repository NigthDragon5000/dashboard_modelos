
    // Find the latest version by visiting https://cdn.skypack.dev/three.
  
    import * as THREE from 'https://cdn.skypack.dev/three';
  

    const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer();
	//renderer.setSize( window.innerWidth, window.innerHeight );
	//document.body.appendChild( renderer.domElement );
    renderer.setSize( 1300, 680 );

    let tree = document.getElementById('tree');
    tree.appendChild( renderer.domElement );

	const geometry = new THREE.IcosahedronGeometry();
	const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
	const cube = new THREE.Mesh( geometry, material );

    const edges = new THREE.EdgesGeometry( geometry );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
 

	scene.add( cube );
    scene.add( line );
    camera.position.z = 3;

	function animate() {
		requestAnimationFrame( animate );

		cube.rotation.x += 0.01;
	    cube.rotation.y += 0.01;

		renderer.render( scene, camera );
	};

	animate();