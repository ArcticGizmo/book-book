<template>
  <BasePage hide-header>
    <ion-fab-button class="filter">
      <ion-icon :icon="funnel" @click="onFilter()" />
    </ion-fab-button>
    <ion-fab-button class="add-item">
      <ion-icon :icon="add" @click="onAdd()" />
    </ion-fab-button>
    <div class="items">
      <ItemCard v-for="{ item, index } in sortedItems" :key="index" :item="item" @click="onEdit(item)" />
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ItemCard from '@/components/ItemCard.vue';
import BasePage from './BasePage.vue';
import { SortType, SortFilterConfig, Book, NewBook } from '@/types';
import { IonFabButton, IonIcon, modalController } from '@ionic/vue';
import { add, funnel } from 'ionicons/icons';
import BookModal from '@/modals/BookModal.vue';
import SortFilterModal from '@/modals/SortFilterModal.vue';
import { sortItems, SortedItem } from '@/code/filter';
import { useBookStore } from '@/composables/bookStore';

const { books, addBook, updateBook, removeBook } = useBookStore();

const sortFilterConfig = ref<SortFilterConfig>({
  sortBy: 'title',
  sortAsc: true,
  sortType: SortType.string
});

const sortedItems = computed<SortedItem<Book>[]>(() => sortItems(books.value, sortFilterConfig.value));

const onFilter = async () => {
  const modal = await modalController.create({
    component: SortFilterModal,
    componentProps: {
      options: [
        { name: 'title', type: SortType.string },
        { name: 'author', type: SortType.string },
        { name: 'series', type: SortType.string },
        { name: 'rating', type: SortType.number }
      ],
      config: sortFilterConfig.value
    }
  });
  await modal.present();
  const resp = await modal.onDidDismiss<SortFilterConfig>();
  if (resp.data) {
    sortFilterConfig.value = resp.data;
  }
};

const onAdd = async () => {
  const modal = await modalController.create({ component: BookModal });
  await modal.present();
  const resp = await modal.onDidDismiss<NewBook>();
  if (resp.data) {
    await addBook(resp.data);
  }
};

const onEdit = async (item: Book) => {
  const modal = await modalController.create({ component: BookModal, componentProps: { item, canDelete: true } });
  await modal.present();
  const resp = await modal.onDidDismiss<Book>();

  if (resp.role === 'destruction') {
    await removeBook(item.id);
    return;
  }

  if (resp?.data) {
    await updateBook(item.id, resp.data);
  }
};
</script>

<style scoped>
.items {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 0.25rem;
  justify-content: space-around;
}

.add-item {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 1000;
}

.filter {
  position: fixed;
  right: 1rem;
  top: 1rem;
  z-index: 1000;
}
</style>
