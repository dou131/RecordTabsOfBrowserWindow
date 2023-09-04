// const sendMessageId=document.getElementById("send_message_id");
// if(sendMessageId){
//     sendMessageId.onclick=function (){
//         chrome.tabs.query({active:true,currentWindow:true},function(tabs){
//             chrome.tabs.sendMessage(
//                 tabs[0].id,
//                 {
//                     url:chrome.runtime.getURL("images/3.jpg"),
//                     imageDivId:`${guidGenerator()}`,
//                     tabId:tabs[0].id
//                 },
//                 function (response){
//                       window.close();
//                 }
//             );
//             function guidGenerator() {
//                 const S4 = function () {
//                     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//                 };
//                 return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
//             }
//         });
//
//     };
// }
//
windows=[]

chrome.storage.local.get({"windows":[]},async function (result){
    windows=result["windows"];
    console.log(windows)
    tables=document.getElementById("windows")
    for(i in windows){
        tr=document.createElement("tr");
        td1=document.createElement("td");
        td2=document.createElement("td");
        td3=document.createElement("td");
        td4=document.createElement("td");
        button=document.createElement("button");
        button.className="btns";
        button.value=i;
        button.innerText="恢复";
        button.onclick=function (e){
            let i=e.target.value;
            urls=[]
            for(let tab of windows[i].tabs){
                urls.push(tab.url)
            }
            chrome.windows.create({
                url:urls
            })
        }
        button2=document.createElement("button");
        button2.className="btns";
        button2.value=i;
        button2.innerText="删除";
        button2.onclick=function (e){
            let i=e.target.value;
            //删除元素，重新存储
            windows.splice(i,1);
            chrome.storage.local.set({"windows":windows},function (){
                window.close();
            });
        }
        td1.innerHTML=i;
        td2.innerHTML=windows[i].name;
        td3.appendChild(button);
        td4.appendChild(button2);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tables.appendChild(tr);
    }
});

function saveTabs(name,tabs){
    let data={
        "name":name,
        "tabs":tabs
    }
    windows.push(data)
    chrome.storage.local.set({"windows":windows},function (){
    });
}


const sendMessageId = document.getElementById("send_message_id");
const close = document.getElementById("close");
close.onclick=function (){
    window.close();
}
if (sendMessageId) {
    sendMessageId.onclick = function() {
        chrome.tabs.query({ currentWindow: true }, function(tabs) {
            let nets=[]
            for(let tab of tabs){
                let net={
                    "title":tab.title,
                    "url":tab.url
                }
                nets.push(net)
            }
            name=document.getElementById("name").value;
            if(name==="在此输入窗口名"){
                name="新窗口"+formatDate();
            }
            saveTabs(name,nets);
            document.getElementById("name").value="在此输入窗口名";
            window.close();

            // chrome.tabs.sendMessage(
            //     tabs[0].id,
            //     {
            //         url: chrome.runtime.getURL("images/3.jpg"),
            //         imageDivId: `${guidGenerator()}`,
            //         tabId: tabs[0].id
            //     },
            //     function(response) {
            //         window.close();
            //     }
            // );
            // function guidGenerator() {
            //     const S4 = function () {
            //         return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            //     };
            //     return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            // }
        });
    };
}

// 不输入参数调用的就是当前时间
// 参数--需转换时间的时间戳
function formatDate(time = new Date()) {
    let date = new Date(time);

    let YY = date.getFullYear();
    let MM = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    // 这里修改返回时间的格式
    return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
}
