/* download file partially before play */

/* copied code, not working (yet) */

(async () => {

  const source = document.createElement( 'video' );
  source.crossOrigin = "anonymous";
  source.muted = true;
  source.src = "https://upload.wikimedia.org/wikipedia/commons/a/a4/BBH_gravitational_lensing_of_gw150914.webm";
  console.log('loading, please wait');
  await source.play();
  
  const player = document.createElement( 'video' );
  player.muted = true;
  const output = document.getElementById( 'output' );
  const ctx = output.getContext( '2d' );
  
  const stream = (source.captureStream && source.captureStream()) || source.mozCaptureStream();
  const recorder = new MediaRecorder( stream );
  const chunks = [];
  recorder.ondataavailable = (evt) => {
    console.clear();
    chunks.push( evt.data );
    play( new Blob( chunks ) );
  };

  console.clear();
  console.log('buffering, please wait 5s');
  recorder.start( 5000 ); // 5s per chunk
  
  source.addEventListener( 'ended', (evt) => recorder.stop() );
  
  function play( blob ) {

    if( player.paused ) {
      drawing = true;
      player.addEventListener( 'loadedmetadata', (evt) => {
        output.width = player.videoWidth;
        output.height = player.videoHeight;
        requestAnimationFrame( loop );
      }, { once: true } );
    }
    player.src = URL.createObjectURL( blob );
    player.play();

  }
  function loop() {
    ctx.drawImage( player, 0, 0 );
    if( !player.paused ) {
      requestAnimationFrame( loop );
    }
  }
  
})().catch( console.error );