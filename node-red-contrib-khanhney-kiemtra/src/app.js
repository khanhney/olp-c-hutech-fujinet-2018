module.exports = function(RED) {
    function lineAppFunction(config) {
        RED.nodes.createNode(this,config);
        var context = this.context();
        var node = this;
        node.TEMP = config.TEMP;
        node.EC = config.EC;
        node.TDS = config.TDS;
        node.HUMI = config.HUMI;
        this.on('input', function(msg) {
            var result = {};
            var check_temp = false, check_ec = false, check_tds = false, check_humi = false;
            if (node.TEMP >= 20 && node.TEMP <= 40) {
                check_temp = true;
            }
            if (node.EC >= 0.5 && node.EC <= 2.4){
                check_ec = true;
            } 
            if (node.TDS >= 280 && node.TDS <= 1400) {
                check_tds = true;
            }
            if (node.HUMI >= 40 && node.HUMI <= 80) {
                check_humi = true;
            }
            if (check_ec && check_temp && check_humi && check_tds){
                result.payload = true;
            } else {
                result.payload = false;
            }
            node.send(result);
        });
    }
    RED.nodes.registerType("KiemTra",lineAppFunction);
};
