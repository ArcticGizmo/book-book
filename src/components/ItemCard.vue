<template>
  <div class="item-card">
    <BImage v-if="item.cover" :src="item.cover" />
    <div v-else class="name">{{ item.title }}</div>
    <div class="rating">{{ item.rating || '--' }}</div>
  </div>
</template>

<script setup lang="ts">
import { Book } from '@/types';
import { PropType } from 'vue';
import BImage from './BImage.vue';

defineProps({
  item: { type: Object as PropType<Book>, required: true }
});
</script>

<style>
.item-card .b-image {
  object-fit: cover;
  margin: 0.1rem;
  height: 100%;
  width: auto;
}
</style>

<style scoped>
.item-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgb(204, 204, 204);
  min-height: 15rem;
}

.name {
  text-align: center;
  width: 100%;
}

.rating {
  text-align: center;
  position: absolute;
  padding: 0.25rem;
  background-color: orange;
  min-width: 2rem;
  top: 0.25rem;
  left: 0.25rem;
}
</style>
