var dmsclient = require('dms-client-library');
class MqttClient {
  constructor(address,topic) {
    this.client = new dmsclient(address,topic);
    this.uniq = topic;
    this.msg = [];
    this.topic = [];
  }
  connect(callback) {
    this.client.connect((ip) => {
      this.client.packetArrived((topic, message) => {
        console.log(topic.toString() + "  : " + message.toString());
        let slashindex = topic.indexOf("/") + 1;
        let real = topic.slice(slashindex, topic.length);
        this.msg.push({
          "topic": real,
          "content": message.toString()
        });
      }, () => {
        callback(ip);
      });
    });
  }
  sendmsg(topic, content, callback) {
    this.client.publish(topic, content,()=>{
      callback(null);
    });
  }
  subTopic(topic, callback) {
    console.log(topic);
    this.client.subscribe(topic,()=>{
      this.topic.push(topic);
      callback(null);
    });
  }
  ubsubTopic(topic, callback) {
    this.client.unsubscribe(topic,()=>{
      let temp = this.topic.indexOf(topic);
      this.topic.splice(temp, 1);
    });
  }
  loadmsg(callback) {
    callback(this.msg);
  }
  loadtopic(callback) {
    callback(this.topic);
  }
  disconnet(callback) {
    this.client.disconnet(() => {
      callback(null);
    });
  }
}
module.exports = MqttClient;
