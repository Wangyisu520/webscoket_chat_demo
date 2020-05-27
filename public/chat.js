//设置客户端socket设置
let socket = io.connect('http://localhost:3000/')

//获取节点
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//事件监听
btn.addEventListener("click",()=>{
    //客户端给服务器发送消息
    socket.emit("chat",{
        message: message.value,
        handle: handle.value
    })
    message.value =""
})

message.addEventListener("keypress",()=>{
    socket.emit("typing",handle.value)
})


//获取服务器传过来的数据
socket.on("chat",(data)=>{
    feedback.innerHTML ="";
    output.innerHTML+=`<p><strong>${data.handle}:${data.message}</strong></p>`
})

//获取服务器广播数据
socket.on("typing",(data)=>{
    feedback.innerHTML=`<p><em>${data}正在输入...</em></p>`
})