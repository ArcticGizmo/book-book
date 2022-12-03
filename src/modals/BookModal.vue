<template>
  <BasePage hide-header>
    <PictureField v-model="state.cover" class="picture-field" name="picture" />
    <TextField v-model="state.title" name="title" />
    <TextField v-model="state.author" name="author" />
    <TextField v-model="state.series" name="series" />
    <NumberField v-model="state.seriesNumber" name="book in series" />
    <NumberField v-model="state.pages" name="pages" />
    <NumberField v-model="state.rating" name="rating" />
    <div class="actions">
      <ion-button @click="onClose()">Cancel</ion-button>
      <ion-button :disabled="!canSubmit" @click="onSubmit()">{{ item ? 'Update' : 'Create' }}</ion-button>
      <ion-button v-if="canDelete" @click="onDelete()">Delete</ion-button>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { PropType, computed, reactive } from 'vue';
import { NewBook } from '@/types';
import BasePage from '@/views/BasePage.vue';
import { modalController, IonButton } from '@ionic/vue';
import TextField from '@/components/TextField.vue';
import NumberField from '@/components/NumberField.vue';
import PictureField from '@/components/PictureField.vue';

const props = defineProps({
  item: { type: Object as PropType<NewBook> },
  canDelete: { type: Boolean }
});

const state = reactive({ title: '', ...props.item });

const canSubmit = computed(() => !!state.title);

const onClose = () => modalController.dismiss();

const onSubmit = () => {
  modalController.dismiss({ ...state });
};
const onDelete = () => {
  modalController.dismiss(undefined, 'destruction');
};
</script>

<style scoped>
.actions {
  display: flex;
  padding-bottom: 5rem;
}

.actions > * {
  width: 100%;
  height: 3rem;
}
</style>
