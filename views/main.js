setInterval(loadmsg, 1000);
setInterval(loadtopic, 1000);
function loadmsg() {
    $.ajax({
        type: "GET",
        url: "/loadmsg",
        success: function(data) {
            var content = "<tr><th>Topic</th><th>Content</th></tr>";
            var msg = data;
            for(var k = 0 ; k < msg.length; k++) {
                var d = '<tr>';
                var b= msg[k];
                d += "<td>"+b.topic+"</td>";
                d += "<td>"+b.content+"</td>";
                content += d;
            }
            $("#msg_list").html(content);
        }
    });
}
function loadtopic() {
    $.ajax({
        type: "GET",
        url: "/loadtopic",
        success: function(data) {
            var content = "<tr><th>Topic</th><tr>";
            var topic = data;
            for(var k = 0 ; k < topic.length; k++) {
                content += '<tr>';
                content += "<td>"+ topic[k] +"</td>";
                content += "</tr>";
            }
            $("#topic_list").html(content);
        }
    });
}

function doConnect() {
  $.ajax({
      type: "GET",
      url: "/connect",
      success: function(data) {
          console.log(data);
          alert(data.msg);
          if(data.broker!="null"){
            $("#status").html("Connected broker : " + data.broker);
          }
      }
  });
}
function doDisconnect() {
  $.ajax({
      type: "GET",
      url: "/disconnect",
      success: function(msg) {
          alert(msg);
          $("#status").html("");
      }
  });
}
function sendmsg() {
    var topic = document.getElementById('topic').value;
    var content = document.getElementById('content').value;
    req_body = {'topic': topic, 'content': content};
    $.ajax({
        type: "POST",
        data: JSON.stringify(req_body),
        contentType: 'application/json',
        url: '/sendmsg',
        success: function (msg) {
            alert(msg);
        }
    });

    document.getElementById('topic').value = "";
    document.getElementById('content').value = "";
}
function subscribeTopic() {
    var topic = document.getElementById('s_topic').value;
    req_body = {'topic': topic};
    $.ajax({
        type: "POST",
        data: JSON.stringify(req_body),
        contentType: 'application/json',
        url: '/subTopic',
        success: function (msg) {
            alert(msg);
        }
    });

    document.getElementById('s_topic').value = "";
}
function unsubscribeTopic() {
    var topic = document.getElementById('s_topic').value;
    req_body = {'topic': topic};
    $.ajax({
        type: "POST",
        data: JSON.stringify(req_body),
        contentType: 'application/json',
        url: '/unsubTopic',
        success: function (msg) {
            alert(msg);
        }
    });

    document.getElementById('s_topic').value = "";
}
