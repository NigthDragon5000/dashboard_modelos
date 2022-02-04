
    // Find the latest version by visiting https://cdn.skypack.dev/three.
  
    import * as THREE from 'https://cdn.skypack.dev/three';
  

    const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );

   
	const renderer = new THREE.WebGLRenderer(
        {alpha:true,}
    );
	//renderer.setSize( window.innerWidth, window.innerHeight );
	//document.body.appendChild( renderer.domElement );
    renderer.setSize( 1300, 680 );

    let tree = document.getElementById('tree');
    tree.appendChild( renderer.domElement );

	//const geometry = new THREE.IcosahedronGeometry();
    const geometry = new THREE.SphereBufferGeometry(.5,64,64)


	//const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );


    const material = new THREE.MeshStandardMaterial( );
    material.metalness=0.7;
    material.roughness=0.2;
    material.color = new THREE.Color(0x292929);
	const cube = new THREE.Mesh( geometry, material );

    //const edges = new THREE.EdgesGeometry( geometry );
    //const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
 

	scene.add( cube );
    //scene.add( line );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;

    //renderer.setSize(sizes.width,sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

	function animate() {
		requestAnimationFrame( animate );

		cube.rotation.x += 0.01;
	    cube.rotation.y += 0.01;

		renderer.render( scene, camera );
	};

	animate();