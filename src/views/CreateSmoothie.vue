<template>
  
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title" >
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" >
      </div>

      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredients">Ingredients:</label>
        <input type="text" name="ingredients" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)" >delete</i>
      </div>

      <div class="field add-ingredient" >
        <label for="add-ingredient">Add an ingredient:</label>
        <input 
          type="text" 
          name="add-ingredient" 
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
import { ref } from 'vue';
import { db } from '../firebase/config';
import { addDoc, collection } from '@firebase/firestore';
import { useRouter } from 'vue-router';
import slugify from 'slugify'
  export default {
    setup(){
      const title = ref(null)
      const another = ref(null)
      const feedback = ref(null)
      const ingredients = ref([])
      const slug = ref(null)

      const router = useRouter()

      const AddSmoothie = () => {
        if(title.value){
          feedback.value = null
          // create slug
          slug.value = slugify(title.value, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          const colRef = collection(db, 'smoothies')

          addDoc(colRef, {
            title: title.value,
            ingredients: ingredients.value,
            slug: slug.value
          }).then(()=> {
            console.log(slug.value)
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
          ingredients.value.push(another.value)
          another.value = null
          feedback.value = null 
          console.log(ingredients.value)
        } else {
          feedback.value = 'You must enter an ingredient'
        }
      }

      const deleteIng = (ing) => {
        ingredients.value = ingredients.value.filter(ingredient => {
          return ingredient != ing
        })
      }
      return { title, another, AddSmoothie, addIng, feedback, ingredients, deleteIng }
    }
  }
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.add-smoothie .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}

</style>