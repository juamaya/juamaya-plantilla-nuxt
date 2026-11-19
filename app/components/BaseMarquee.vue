
<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

interface MarqueeImage {
  src: string
  alt?: string
  title?: string
  link?: string
}

interface Props {
  images: MarqueeImage[]
  speed?: number
  direction?: 'left' | 'right'
  height?: string
  imageWidth?: string
  gap?: string
  rounded?: string
  pauseOnHover?: boolean
  reverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  speed: 35,
  direction: 'left',
  height: '120px',
  imageWidth: '180px',
  gap: '24px',
  rounded: 'rounded-4',
  pauseOnHover: true,
  reverse: false
})

const firstGroup = ref<HTMLElement | null>(null)
const groupWidth = ref(0)

let resizeObserver: ResizeObserver | undefined

const animationDuration = computed(
  () => `${Math.max(1, props.speed)}s`
)

const animationDirection = computed(() =>
  props.reverse
    ? (props.direction === 'left' ? 'reverse' : 'normal')
    : (props.direction === 'left' ? 'normal' : 'reverse')
)

const updateWidth = () => {
  if (firstGroup.value) {
    groupWidth.value = firstGroup.value.getBoundingClientRect().width
  }
}

onMounted(async () => {
  await nextTick()

  updateWidth()

  if (firstGroup.value) {
    resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(firstGroup.value)
  }

  window.addEventListener('resize', updateWidth)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateWidth)
})
</script>

<template>
  <div
    v-if="images.length"
    class="base-marquee"
    :class="{ 'pause-on-hover': pauseOnHover }"
    :style="{
      '--marquee-height': height,
      '--marquee-width': imageWidth,
      '--marquee-gap': gap,
      '--marquee-duration': animationDuration,
      '--marquee-direction': animationDirection,
      '--marquee-distance': `${groupWidth}px`
    }"
  >
    <div class="marquee-track">

      <!-- Primer grupo -->
      <div
        ref="firstGroup"
        class="marquee-group"
      >
        <div
          v-for="(image, index) in images"
          :key="`first-${image.src}-${index}`"
          class="marquee-item"
        >
          <NuxtLink
            v-if="image.link"
            :to="image.link"
            class="marquee-image-link"
          >
            <img
              :src="image.src"
              :alt="image.alt || image.title || 'Imagen'"
              :title="image.title"
              class="marquee-image"
              :class="rounded"
              loading="lazy"
            >
          </NuxtLink>

          <img
            v-else
            :src="image.src"
            :alt="image.alt || image.title || 'Imagen'"
            :title="image.title"
            class="marquee-image"
            :class="rounded"
            loading="lazy"
          >
        </div>
      </div>

      <!-- Segundo grupo -->
      <div
        class="marquee-group"
        aria-hidden="true"
      >
        <div
          v-for="(image, index) in images"
          :key="`second-${image.src}-${index}`"
          class="marquee-item"
        >
          <img
            :src="image.src"
            alt=""
            class="marquee-image"
            :class="rounded"
            loading="lazy"
          >
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.base-marquee {
  width: 100%;
  overflow: hidden;
  position: relative;
  min-width: 0;

  mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );

  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
}

.marquee-track {
  display: flex;
  width: max-content;
  align-items: center;

  animation: marquee-scroll
    var(--marquee-duration)
    linear
    infinite;

  animation-direction: var(--marquee-direction);
  will-change: transform;
}

.marquee-group {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: var(--marquee-gap);
  padding-right: var(--marquee-gap);
}

.marquee-item {
  flex: 0 0 var(--marquee-width);
  width: var(--marquee-width);
  height: var(--marquee-height);
}

.marquee-image,
.marquee-image-link {
  display: block;
  width: 100%;
  height: 100%;
}

.marquee-image {
  object-fit: cover;
  transition: transform .3s ease;
}

.marquee-image:hover {
  transform: scale(1.05);
}

.pause-on-hover:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-1 * var(--marquee-distance)));
  }
}

@media (max-width: 768px) {
  .marquee-group {
    gap: 14px;
    padding-right: 14px;
  }

  .marquee-item {
    flex-basis: min(var(--marquee-width), 38vw);
    width: min(var(--marquee-width), 38vw);
    height: min(var(--marquee-height), 90px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
