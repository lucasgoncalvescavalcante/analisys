<template>
  <div class="container">
    <h1>Contas a pagar</h1>
    <form @submit.prevent="buscarContas">
      <div class="form-group">
        <label for="periodo">Período</label>
        <input type="text" class="form-control" id="periodo" v-model="periodo">
      </div>
      <div class="form-group">
        <label for="numero">Número da conta</label>
        <input type="text" class="form-control" id="numero" v-model="numero">
      </div>
      <button type="submit" class="btn btn-primary">Buscar</button>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Conta Contábil</th>
          <th>Nova Conta Contábil</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="conta in contas">
          <td>{{ conta.id }}</td>
          <td>{{ conta.contaContabil }}</td>
          <td>
            <input type="text" class="form-control" v-model="conta.novaContaContabil">
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary" @click="alterarContas">Salvar Alterações</button>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  data() {
    return {
      periodo: '',
      numero: '',
      contas: []
    };
  },
  methods: {
    buscarContas() {
      // Chamada à API simulada
      const response = axios.get('/api/buscar-contas', {
        params: {
          periodo: this.periodo,
          numero: this.numero
        }
      });

      this.contas = response.data;
    },
    alterarContas() {
      // Lógica para atualizar contas na API (simulado)
      for (const conta of this.contas) {
        axios.put(`/api/alterar-conta-contabil/${conta.id}`, {
          novaContaContabil: conta.novaContaContabil
        });
      }

      console.log('Contas atualizadas:');
      console.log(this.contas);
    }
  }
};
</script>

<style>
table {
  width: 100%;
}

th, td {
  padding: 10px;
}
</style>