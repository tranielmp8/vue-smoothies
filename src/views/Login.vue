<template  >
<center class="container">
  <form class="login">
    <h1>LOGIN</h1>

    <label >Email: </label>
    <input type="email" required>

    <label >Password: </label>
    <input type="password" required>

    <button>Submit</button>

    <p>Need to <span><a href="#">SignUp?</a></span></p>
  </form>
</center>
  
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

.container { 
  margin: 20px auto;
}

h1 {
  background: none;
}
.login {
  max-width: 550px;
  background: rgb(83, 190, 83);
  border-radius: 8px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

label {
  font-size: 20px;
  color: white;
  background: transparent;
  margin: 8px 0;
}

input {
  border: none;
  border-bottom: #fff solid 2px;
  width: 70%;
  background: #fff;
  margin-bottom: 8px;
  font-size: 20px;
  color: rgb(83, 190, 83);
  padding: 5px;
}

button {
  width: 25%;
  padding: .7rem;
  border: none;
  border-radius: 8px;
  color: #fff;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-size: 18px;
}

button:hover {
  background: #fff;
  color: rgb(83, 190, 83);
  transition: .3s all ease;
}

p {
  background: none;
  padding: .8rem;
}
span {
  background: none;
}

a {
  background: none;
  /* text-decoration: none; */
  color: #fff;
  font-size: 18px;
}

a:hover {
  color: #222;
  transition: .3s all ease;
}

</style>