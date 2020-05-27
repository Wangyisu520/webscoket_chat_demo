const express = require("express")
const socket = require("socket.io")

const app = express();

//静态加载页面
app.use(express.static(__dirname+'/public/'))


let server = app.listen(3000,()=>{
    console.log("服务启动中")
})

//socket.io设置
const io = socket(server);
io.on("connection",(socket)=>{
    console.log("socket 连接成功")

    //获取客户端发送数据
    socket.on('chat',(data)=>{
        io.sockets.emit("chat",data);
    })

    //获取客户端广播数据
    socket.on('typing',(data)=>{
        socket.broadcast.emit("typing",data)
    })
})