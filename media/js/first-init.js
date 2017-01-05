// Recorder
var startUserMedia = function(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    console.info('Media stream created.');
    // Uncomment if you want the audio to feedback directly
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');
    window.recorder = new Recorder(input);
    console.info('Recorder initialised.');
};
var initRecorder = function() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        window.audio_context = new AudioContext();
        console.info('Audio context set up.');
        console.info('navigator.getUserMedia ' + (navigator.getUserMedia
            ? 'available.'
            : 'not present!'));
        window.webAudioSupport = true;
    } catch (e) {
        console.info('No web audio support in this browser!');
        window.webAudioSupport = false;
    }
    navigator.getUserMedia({
        audio: true
    }, startUserMedia, function(e) {
        console.info('No live audio input: ' + e);
    });
}();
