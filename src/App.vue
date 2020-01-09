<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

.slide-right-enter-active, .slide-right-leave-active {
    transition: all .4s;
}
.slide-right-enter, .slide-right-leave-active {
    transform: translate3d(100%, 0, 0);  
}
</style>
