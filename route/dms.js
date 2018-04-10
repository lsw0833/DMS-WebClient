var MqttClient = require('../model/mqttclient');
var address = "163.180.117.30:8080";
var uniq="test";
var cli = [];
var cnt = 1;
cli.push(null);
var home = function(req, res) {
  res.render('main.ejs');
};
var connect = function(req, res) {
  if (req.session.num) {
    res.send({
      msg: 'It\'s already connected',
      broker: "null"
    });
  } else {
    cli.push(new MqttClient(address,uniq));
    req.session.num = cnt;
    cnt++;
    cli[req.session.num].connect((ip) => {
      if (ip) {
        res.send({
          msg: 'Connection successful',
          broker: ip
        });
      } else {
        cli[req.session.num] = null;
        delete req.session.num;
        res.send({
          msg: 'Don`t find broker',
          broker: "null"
        });
      }
    });
  }
};
var disconnect = function(req, res) {
  if (!req.session.num) {
    res.send("It's already disconnected");
  } else {
    cli[req.session.num].disconnet(() => {
      cli[req.session.num] = null;
      delete req.session.num;
      res.send('Disconnect Successful');
    });
  }
};
var sendmsg = function(req, res) {
  if (req.session.num) {
    var topic = req.body.topic;
    var content = req.body.content;
    cli[req.session.num].sendmsg(topic, content,()=>{
       res.send("Message transfer successful");
    });
  } else {
    res.send("Connection required");
  }
};
var loadmsg = function(req, res) {
  if (!req.session.num) {
    var temp = [];
    res.send(temp);
  } else {
    cli[req.session.num].loadmsg((msg) => {
      res.send(msg);
    });
  }
};
var loadtopic = function(req, res) {
  if (!req.session.num) {
    var temp = [];
    res.send(temp);
  } else {
    cli[req.session.num].loadtopic((topic) => {
      res.send(topic);
    });
  }
};
var subTopic = function(req, res) {
  if (req.session.num) {
    var topic = req.body.topic;
    cli[req.session.num].subTopic(topic,()=>{
       res.send("Subscribe successful");
    });
  } else {
    res.send("Connection required");
  }
};
var unsubTopic = function(req, res) {
  if (req.session.num) {
    var topic = req.body.topic;
    cli[req.session.num].ubsubTopic(topic,()=>{
       res.send("Unsubscribe successful");
    });
  } else {
    res.send("Connection required");
  }
};
module.exports.home = home;
module.exports.connect = connect;
module.exports.disconnect = disconnect;
module.exports.sendmsg = sendmsg;
module.exports.loadmsg = loadmsg;
module.exports.loadtopic = loadtopic;
module.exports.subTopic = subTopic;
module.exports.unsubTopic = unsubTopic;
