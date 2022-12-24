<template>
  <div v-if="smoothie" class="edit-smoothie container" >
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="EditSmoothie">
      <div class="field title" >
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" >
      </div>

      <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredients">Ingredients:</label>
        <input type="text" name="ingredients" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)" >delete</i>
      </div>

      <div class="field edit-ingredient" >
        <label for="edit-ingredient">Edit an ingredient:</label>
        <input 
          type="text" 
          name="edit-ingredient" 
          @keydown.tab.prevent="addIng"
          v-model="another" 
          >
      </div>

      <p v-if="feedback" class="red-text">{{ feedback }}</p>
      <div class="field center-align" >
        <button  class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import { collection, onSnapshot, query, where, updateDoc, doc } from '@firebase/firestore';
import { db } from '../firebase/config';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import slugify from 'slugify';


  export default {
    setup() {
      const smoothie = ref(null)
      const another = ref(null)
      const feedback = ref(null)
      const route = useRoute()
      const router = useRouter()

      let document =  collection(db, 'smoothies')
      const q = query(document, where('slug', '==', route.params.smoothie_slug ))
      onSnapshot(q, (snapshot) => {
        
        snapshot.forEach(doc => {
          smoothie.value = doc.data()
          smoothie.id = doc.id
        })
      })

      const EditSmoothie = () => {
        if(smoothie.value.title){
          feedback.value = null
          // create slug
          smoothie.value.slug = slugify(smoothie.value.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          const docRef = doc(db, 'smoothies', smoothie.id)

          updateDoc(docRef, {
            title: smoothie.value.title,
            ingredients: smoothie.value.ingredients,
            slug: smoothie.value.slug
          }).then(()=> {
            router.push('/')
          }).catch(err => {
            console.log(err)
          })
          
        }else {
          feedback.value = 'You must enter a smoothie title'
        }
      }
      const addIng = () => {
        if(another.value){
          smoothie.ingredients.value.push(another.value)
          another.value = null
          feedback.value = null 
          console.log(ingredients.value)
        } else {
          feedback.value = 'You must enter an ingredient'
        }
      }

      const deleteIng = (ing) => {
        smoothie.value.ingredients = smoothie.value.ingredients.filter(ingredient => {
          return ingredient != ing
        })
      }


      return { smoothie, feedback, another, deleteIng, addIng, EditSmoothie }
    }
    
  }
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.edit-smoothie .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}

</style>