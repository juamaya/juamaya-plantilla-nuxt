<script setup lang="ts">
 

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-900  p-5  mt-10">
    <div>
      <p class="text-gray-400 text-sm text-center">

        Planta de Puerto Real. Ubicada en Calle Portugal, s/n, 11519 Puerto Real (Cádiz)
      </p>
      <p class="text-gray-400 text-sm text-center">
        © {{ currentYear }} Juamaya26. Todos los derechos reservados.
      </p>
    </div>
      
  </footer>
</template>
