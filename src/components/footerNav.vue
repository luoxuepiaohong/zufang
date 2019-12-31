<template>
    <yd-tabbar :fixed="true" active-color="#20a0ff">
        <yd-tabbar-item title="首页" link="#">
            <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="demo" link="demoCenter" :active="pageName == '模板中心'">
            <yd-icon name="iconfont icon-moban" slot="icon" size="0.54rem" :custom=true></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="图片" link="camera" >
            <img slot="icon" style="height: 25px;" src="http://static.ydcss.com/ydui/img/logo.png">
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="userCenter" :active="pageName == '个人中心'">
            <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar>
</template>

<script>
    export default {
        props: ['pageName'],
    }
</script>

<style type="text/css">
    /*自定义图标*/
    @font-face {
        font-family: 'iconfont';
        src: url('/assets/css/iconfont.ttf') format('truetype');
    }
    [class^="icon-custom-"]:before, [class*=" icon-custom-"]:before {
        font-family: 'iconfont';
    }

    .icon-moban:before { content: "\e635"; }
</style>