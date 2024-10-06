<template>
  <div>
    <h1>アイテム管理</h1>
    <form @submit.prevent="createItem">
      <label>アイテム</label>
      <input v-model="item" type="text" required />
      <label>説明</label>
      <input v-model="description" type="text" required />
      <button type="submit">作成</button>
    </form>

    <ul>
      <li v-for="(doc, index) in items" :key="index" @click="goToDetail(doc.id)">
        {{ doc.data().item }} - {{ doc.data().description }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase';

export default {
  setup() {
    const item = ref("");
    const description = ref("");
    const items = ref([]);

    // Firestoreからデータを取得
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      items.value = querySnapshot.docs;
    };

    // Firestoreに新しいアイテムを作成
    const createItem = async () => {
      if (item.value && description.value) {
        await addDoc(collection(db, "items"), {
          item: item.value,
          description: description.value
        });
        item.value = "";
        description.value = "";
        fetchItems(); // 更新されたデータを再取得
      }
    };

    // 詳細ページに遷移
    const goToDetail = (id) => {
      window.location.href = `/detail/${id}`;
    };

    onMounted(fetchItems);

    return {
      item,
      description,
      items,
      createItem,
      goToDetail
    };
  }
};
</script>
