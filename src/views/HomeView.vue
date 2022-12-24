
<template>
  <div class="home container" >
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id" >
      <div class="card-content" >
        <i class="material-icons delete" @click="handleDelete(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index" >
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'editSmoothie', params: { smoothie_slug: smoothie.slug } }" >
          <i class="material-icons edit" >edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script >
import { db } from '../firebase/config'
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore'
import { ref } from 'vue';
  export default{
    setup() {
      const smoothies = ref([])
      const colRef = collection(db, 'smoothies')

      const handleDelete = (id) => {
        const docRef = doc(db, 'smoothies', id)
        deleteDoc(docRef)
        .then(()=>{
            smoothies.value = smoothies.value.filter((smoothie) => {
            return smoothie.id != id
          })
        })
      }

      getDocs(colRef)
      .then(snapshot => {
        let docs = []
        snapshot.docs.forEach(doc => {
          docs.push({ ...doc.data(), id: doc.id})
        })
        smoothies.value = docs
      })

      return { smoothies, handleDelete }
    }
  }
</script>

<style>
 .home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  margin-top: 60px;
 }

.home h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.home .ingredients {
  margin: 30px auto;

}

.home .ingredients li{
  display: inline-block;
}

.home .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

</style>

