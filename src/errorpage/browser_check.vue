<template>
<div id="wrap" class="home">
<content>
    <div class="sub-content bgcontent">
        <div class="top-tips">
            <img src="../assets/img/errorimg/c-alarm.png"/>
            <div class="tips-content">
                <span style="font-size:30px;">浏览器不符合要求！！！</span>
                <p style="font-size:16px;">对不起，您的浏览器版本不符合系统要求，请选择以下浏览器进行系统访问！</p>
            </div>
        </div>
        <div style="background-color:#fff; width:850px; height:400px;  position:absolute; top:180px; left:50%;  margin-left:-400px; border-radius:10px; ">
            <span style="color:#ff9900; font-size:20px; position:absolute; top:30px; left:40px;">本系统支持浏览器
                <span style="color:#999; font-size:14px;">点击图标直接下载</span>
            </span>
            <ul class="bul">
                <li><a href="http://www.firefox.com.cn/download/" target="_blank">
                    <img class="bimg"  src="../assets/img/errorimg/firefox.png"/><span class="btx ">Firefox</span></a>
                </li>
                <li><a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target="_blank">
                    <img class="bimg" src="../assets/img/errorimg/ie.png"/><span class="btx">IE10+</span></a>
                </li>
                <li><a href="http://dlsw.baidu.com/sw-search-sp/soft/9d/14744/ChromeStandaloneSetup.1423193937.exe">
                    <img class="bimg" src="../assets/img/errorimg/google.png"/><span class="btx">Chrome</span></a>
                </li>
                <li><a href="http://se.360.cn/" target="_blank"><img class="bimg" src="../assets/img/errorimg/360.png"/>
                    <span class="btx">360极速模式</span></a>
                </li>
            </ul>
        </div>
   </div>
</content>
</div>
</template>
<script>
    export default {};
</script>
<style>
    .bgcontent {
        font-family: Arial, "微软雅黑", "宋体", Tahoma, Helvetica, sans-serif;
        background: #fcfcfc url(../assets/img/errorimg/check-bg.png) repeat-x top center;
        padding-top: 0 !important;
    }
    a:active {
        outline: none;
        blr: expression(this.onFocus=this.blur());
    }
    .bul {
        margin-left: 50px;
    }
    .bul li {
        list-style: none;
        float: left;
        margin-top: 80px;
        width: 180px;
        cursor: pointer;
    }
    .bimg {
        padding: 15px;
        border: 1px solid #e9e9e9;
        border-radius: 5px;
    }
    .btx {
        display: inline-block;
        color: #999;
        font-size: 24px;
        width: 150px;
        text-align: center;
        text-decoration: none;
    }
    .top-tips {
        color: #fff;
        margin-top: 50px;
        position: absolute;
        left: 50%;
        margin-left: -350px;
    }
    .top-tips p {
    color: #fff;

    }
    .top-tips img {
        float: left;
    }
    .tips-content {
        float: left;
        text-align: left;
        padding-top: 15px;
        padding-left: 10px;
    }
</style>
