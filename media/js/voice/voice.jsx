var Voice = React.createClass({
    getInitialState: function() {
        return {isShow: false, isRecording: false, isTiming: false, countTime: 0};
    },
    showRecorder: function() {
        var that = this;
        this.setState({
            isShow: !that.state.isShow
        });
    },
    beginRecording: function() {
        recorder && recorder.record();
        var that = this;
        this.setState({isRecording: true, isTiming: true});
        this.newTiming = setInterval(function() {
            that.startCountTime();
        }, 1000);
    },
    stopRecording: function() {
        var that = this;
        this.setState({isRecording: false, isTiming: false, countTime: 0});
        clearInterval(this.newTiming);
        this.createAudio();
    },
    createAudio: function() {
        var that = this;
        that.now = new Date();
        recorder.exportWAV(function(blob) {
            that.voiceData = new FormData();
            that.voiceData.append('fname', md5(that.now.getFullYear()));
            that.voiceData.append('data', blob);
            $.ajax({url: '/voice/save', data: that.voiceData, success: that.saveVoiceSuccess, processData: false, contentType: false});
        });
    },
    saveVoiceSuccess: function(data) {
        console.info(data);
    },
    startCountTime: function() {
        var that = this;
        this.setState({
            countTime: ++that.state.countTime
        });
    },
    render: function() {
        var that = this;
        this.$popoverClass = !this.state.isShow
            ? "lcb-popover"
            : "lcb-popover show";
        this.$isRecordingClass = !this.state.isRecording
            ? "recorder hvr-pulse-grow"
            : "recorder hvr-pulse-grow recording-active";
        this.$iconRecording = !this.state.isRecording
            ? "icon-microphone icons"
            : "icon-control-pause icons";

        return (
            <div className="lcb-wrapper">
                <div className={this.$popoverClass}>
                    <div className={this.$isRecordingClass} onClick={this.state.isRecording
                        ? this.stopRecording
                        : this.beginRecording}>
                        <i className={this.$iconRecording}></i>
                    </div>
                    <span className="time-recording">{this.state.countTime.toString().toHHMMSS()}</span>
                </div>
                <button onClick={this.showRecorder} type="submit" className="lcb-entry-button" id="voice-recorder" title="Voice" aria-label="Voice">
                    <i className="icon-earphones-alt icons"></i>
                </button>
            </div>
        );
    }
});
