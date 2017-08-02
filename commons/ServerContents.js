var ServerContents = function(){

    // local path
    var BACKSERVER_URL_PREFIX = "http://127.0.0.1";
    //var BACKSERVER_URL_PREFIX = "http://121.41.91.108";
    var BACKSERVER_PORT = 5001;
    this.getBackServerUrl = function(){
        return BACKSERVER_URL_PREFIX + ":" + BACKSERVER_PORT;
    };

    var pageStartDefault = 1;
    this.getPageStartDefault = function () {
        return pageStartDefault;
    };

};

module.exports = ServerContents;