let localStream = {
    myStream : null,
    setMyStream : function (stream) {
        this.myStream = stream; 
    },
    switchCamera : function (camDeviceId) {
        if (this.myStream) {
            this.myStream.switchCamera(this.myStream, camDeviceId, (res) => {
                console.log('switchCamera res ', res);
            })
        }
    }
}

export default localStream;