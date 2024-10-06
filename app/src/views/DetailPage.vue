<template>
  <div>
    <!-- タイトルをクリックでトップページに遷移するよう修正 -->
    <h1 @click="goToHome" style="cursor: pointer;">アイテム詳細</h1>

    <div>
      <p><strong>アイテム:</strong> {{ item }}</p>
      <p><strong>説明:</strong> {{ description }}</p>
      <button @click="enableEditing">編集</button>
    </div>

    <div v-if="isEditing">
      <label>アイテム</label>
      <input v-model="item" type="text" />
      <label>説明</label>
      <input v-model="description" type="text" />
      <button @click="updateItem">保存</button>
      <button @click="cancelEditing">キャンセル</button>
    </div>

    <button @click="deleteItem">削除</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useRoute, useRouter } from 'vue-router'; // ルーターをインポート

export default {
  setup() {
    const route = useRoute();
    const router = useRouter(); // useRouterフックを使用
    const itemId = route.params.id;
    const item = ref("");
    const description = ref("");
    const isEditing = ref(false); // 編集モードかどうか

    // アイテムの詳細を取得
    const fetchItem = async () => {
      const docRef = doc(db, "items", itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        item.value = docSnap.data().item;
        description.value = docSnap.data().description;
      }
    };

    // 編集モードを有効にする
    const enableEditing = () => {
      isEditing.value = true;
    };

    // 編集をキャンセルする
    const cancelEditing = () => {
      isEditing.value = false;
    };

    // アイテムを更新
    const updateItem = async () => {
      const docRef = doc(db, "items", itemId);
      await updateDoc(docRef, {
        item: item.value,
        description: description.value
      });
      window.alert("アイテムが更新されました！");
      isEditing.value = false; // 編集モードを終了
    };

    // アイテムを削除
    const deleteItem = async () => {
      const docRef = doc(db, "items", itemId);
      await deleteDoc(docRef);
      window.alert("アイテムが削除されました！");
      router.push("/"); // ホームに戻る
    };

    // トップページに遷移
    const goToHome = () => {
      router.push("/"); // ルーターでトップページに遷移
    };

    onMounted(fetchItem);

    return {
      item,
      description,
      isEditing,
      enableEditing,
      cancelEditing,
      updateItem,
      deleteItem,
      goToHome // トップページ遷移関数を追加
    };
  }
};
</script>
