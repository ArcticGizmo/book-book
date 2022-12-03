import { writeToStore, loadFromStore } from '@/code/persistence';
import { Book, NewBook } from '@/types';
import { ref } from 'vue';
import { v4 as createUuid } from 'uuid';

const STORE_ID = 'BOOKS';
const books = ref<Book[]>([]);

const saveBooks = async (books: Book[]) => {
  await writeToStore(STORE_ID, books);
};

// load initially from store
loadFromStore<Book[]>(STORE_ID).then(resp => {
  if (resp) {
    books.value = resp;
  }
});

export const useBookStore = () => {
  const addBook = async (book: NewBook) => {
    books.value.push({ ...book, id: createUuid() });
    await saveBooks(books.value);
  };

  const updateBook = async (id: string, update: NewBook | Book) => {
    const index = books.value.findIndex(b => b.id === id);
    if (!index) {
      throw `Book with id '${id}' not found`;
    }

    books.value[index] = { ...books.value[index], ...update, id };
  };

  const removeBook = async (id: string) => {
    books.value = books.value.filter(b => b.id !== id);
    await saveBooks(books.value);
  };

  // TODO: fix the readonly not decomposing correctly for type
  // const immutableBooks = readonly(books);
  const immutableBooks = books;

  return { books: immutableBooks, addBook, updateBook, removeBook };
};
