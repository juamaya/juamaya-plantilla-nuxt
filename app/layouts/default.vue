<script setup lang="ts">
import BtnScrollTop from '~/components/BtnScrollTop.vue';
import Footer from '~/components/Footer.vue'

import NavBar from '~/components/NavBar.vue'
</script>

<template>
  <div>
    <!-- NAVBAR -->

    <NavBar />

    <main>
      <slot />
    </main>
    <!-- BOTON VOLVER ARRIBA -->

    <BtnScrollTop/>

    <Footer />
  </div>
</template>
