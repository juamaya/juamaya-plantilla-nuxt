<script setup lang="ts">
const config = useRuntimeConfig();

const imagenes = [
  { src: "/images/a320-1.png", alt: "A320" },
  { src: "/images/a320.png", alt: "A320" },
  { src: "/images/a320-2.png", alt: "A320" },
  { src: "/images/a320.png", alt: "A320" },
  { src: "/images/a320-1.png", alt: "A320" },
  { src: "/images/a320-2.png", alt: "A320" },
 
].map((image) => ({
  ...image,
  src: `${config.app.baseURL}${image.src.replace(/^\//, "")}`,
}));
</script>

<template>
  <div class="min-h-screen flex flex-col relative">
    <!-- IMAGEN DE FONDO RESPONSIVE -->
    <div class="fixed inset-0 -z-20 overflow-hidden bg-gray-900">
      <picture>
        <img
          src="/images/sonaca.png"
          alt="Fondo SONACA"
          class="w-full h-full object-contain sm:object-cover md:object-cover lg:object-cover object-center"
        />
      </picture>
    </div>

    <!-- CAPA OSCURA -->
    <div class="fixed inset-0 -z-10 bg-black/40"></div>



    <!-- CONTENIDO -->
    <main class="grow pt-10 relative z-0">
      <NuxtPage />
      <div class="mt-30">
        <BaseMarquee
          :images="imagenes"
          :speed="15"
          direction="right"
          height="140px"
          image-width="200px"
          gap="150px"
          rounded="rounded-4"
          :pause-on-hover="false"
        />
      </div>

      <div class="mt-10">
        <BaseMarquee
          :images="imagenes"
          :speed="10"
          direction="right"
          height="140px"
          image-width="200px"
          gap="150px"
          rounded="rounded-4"
          :pause-on-hover="false"
        />
      </div>
    </main>
  </div>
</template>
