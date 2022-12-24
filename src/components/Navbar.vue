<template>
  <div class="navbar" >
    <nav class="nav-extended indigo darken-2" >
      <div class="nav-content" >
        <router-link :to="{ name: 'home' }">
          <span class="nav-title" >Ninja Smoothies</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink" >
          <router-link :to="{ name: 'createSmoothie' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    setup(){

      return {}
    }
  }
</script>

<style>
.navbar nav {
  padding: 0 1rem;
}
</style>