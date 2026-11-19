<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
 
];

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50 bg-orange-300 backdrop-blur-lg shadow-sm"
  >
    <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- LOGO -->
      <NuxtLink
        to="/"
        class="text-lg 2xl font-bold text-indigo-600 tracking-tight"
        @click="closeMenu"
      >
        Juamaya ✈ <span class="text-gray-900">HTP-A320</span>
      </NuxtLink>

      <!-- MENU DESKTOP -->
      <div class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="relative py-2 text-sm font-medium transition-colors duration-300"
          :class="
            isActive(link.path)
              ? 'text-indigo-600'
              : 'text-gray-600 hover:text-indigo-600'
          "
        >
          {{ link.name }}

          <!-- INDICADOR ACTIVO -->
          <span
            class="absolute left-0 -bottom-1 h-0.5 bg-indigo-600 transition-all duration-300"
            :class="isActive(link.path) ? 'w-full' : 'w-0'"
          />
        </NuxtLink>
      </div>

      <!-- BOTON MOVIL -->
      <button
        class="md:hidden p-2 text-gray-800"
        @click="isOpen = !isOpen"
        :aria-expanded="isOpen"
        aria-label="Abrir o cerrar menú"
      >
        <svg
          v-if="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- MENU MOVIL -->
    <Transition name="menu">
      <div
        v-if="isOpen"
        class="md:hidden bg-gray-400 border-t border-gray-100 shadow-lg"
      >
        <div class="flex flex-col px-6 py-4 gap-2">
          <NuxtLink
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            @click="closeMenu"
            class="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300"
            :class="
              isActive(link.path)
                ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
            "
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
