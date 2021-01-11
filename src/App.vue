<template>
  <v-app id="app">
    <router-view></router-view>
</v-app>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    font-family: "Pokemon Solid", Arial, Helvetica, sans-serif;

}

@font-face {
  font-family: "Pokemon Solid";
  src: local("Pokemon Solid"),   url('./assets/fonts/pokemon/Pokemon Solid.ttf') format("truetype");}

</style>
