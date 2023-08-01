<template>
  <div>
    <h2>Editar Usuário</h2>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="username">ID</label>
        <input type="text" class="form-control" v-model="formData.id" disabled />
      </div>
      <div class="form-group">
        <label for="name">username</label>
        <input type="text" class="form-control" v-model="formData.username" />
      </div>
      <div class="form-group">
        <label for="functionId">name</label>
        <input type="text" class="form-control" v-model="formData.name" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="text" class="form-control" v-model="formData.functionname" />
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        id: null, // Correspondendo a `USERNAME`
        username: '',     // Correspondendo a `NAME`
        name: '', // Correspondendo a `FUNCTIONID`
        functionname: '', // Correspondendo a `PASSWORD`
      },
    };
  },
  async mounted() {
    try {
      const userId = this.$route.params.userId;
      const response = await axios.get(`http://localhost:3000/api/v1/getuserdata/${userId}`);
      this.formData.id = response.data[0]; // O índice 1 corresponde a `USERNAME`
      this.formData.username = response.data[1];     // O índice 2 corresponde a `NAME`
      this.formData.name = response.data[2]; // O índice 3 corresponde a `FUNCTIONID`
      if (response.data[3] == 1)
      {
        this.formData.functionname = 'Auxiliar';
      } // O índice 4 corresponde a `PASSWORD`
      if (response.data[3] == 2)
      {
        this.formData.functionname = 'Administrador';
      } // O índice 4 corresponde a `PASSWORD`
      if (response.data[3] == 2)
      {
        this.formData.functionname = 'Gerente';
      } // O índice 4
      
      console.log(response);
      console.log('o usuário é ', this.formData.username);
    } catch (error) {
      console.error(error);
      // Lide com o erro (por exemplo, redirecione o usuário para uma página de erro)
    }
  },
  methods: {
    // Restante do código do componente, incluindo o método updateUser, permanece o mesmo.
  },
};
</script>


<style>
/* Seus estilos personalizados aqui, se necessário */
</style>
