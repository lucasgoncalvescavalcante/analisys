<template>
  <div class="container mt-4">
    <form>
      <div class="form-group row">
        <label for="contas-input" class="col-sm-2 col-form-label">Contas a Pagar:</label>
        <div class="col-sm-4 mb-3">
          <input type="text" class="form-control" id="contas-input" v-model="contasid">
        </div>
        <div class="col-sm-2">
          <button type="button" class="btn btn-primary" @click="getContas">Consultar</button>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Conta Contábil:</label>
        <div class="col-sm-4 mb-3 d-flex align-items-center">
          <input type="text" class="form-control mr-3" :value="conta.contacontabil" disabled>
          <button type="button" class="btn btn-secondary ml-3" v-show="!showNewContacontabil && !conta.lote" @click="showNewContacontabil = true">Alterar</button>
          <button type="button" class="btn btn-secondary ml-3" v-show="!showNewContacontabil && conta.lote" @click="confirmUpdateContacontabil">Alterar</button>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Período Início:</label>
        <div class="col-sm-4 mb-3">
          <input type="text" class="form-control" :value="formatDate(conta.periodoInicio)" disabled>
        </div>
      </div>
      <div class="form-group row">  
        <label class="col-sm-2 col-form-label">Período Fim:</label>
        <div class="col-sm-4 mb-3">
          <input type="text" class="form-control" :value="formatDate(conta.periodoFim)" disabled>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Lote:</label>
        <div class="col-sm-4 mb-3">
          <input type="text" class="form-control" :value="conta.lote" disabled>
        </div>
      </div>
      <div class="form-group row mb-3" v-if="showNewContacontabil && !conta.lote">
        <label class="col-sm-2 col-form-label">Nova Conta Contábil:</label>
        <div class="col-sm-4 mb-3">
          <input type="text" class="form-control" v-model="newContacontabil">
        </div>
        <div class="col-sm-2">
          <button type="button" class="btn btn-primary" @click="updateContacontabil">Salvar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  data() {
    return {
      contasid: '',
      conta: {},
      newContacontabil: '',
      showNewContacontabil: false
    };
  },
  methods: {
    async getContas() {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/getcontas/${this.contasid}`);
        this.conta = response.data[0];
        console.log(this.conta);

      } catch (err) {
        console.error(err);
      }
    },
    async updateContacontabil() {
      try {
        /*const response = await axios.put(`http://localhost:3000/api/v1/setcontacontabil/${this.contasid}`, {
          contacontabil: this.newContacontabil
        });*/
        swal('Conta contabil atualizada', 'Valor da conta contabil atualizado com sucesso.', 'success');
        this.showNewContacontabil = false;
        const response = await axios.put(`http://localhost:3000/api/v1/setcontacontabil/${this.contasid}`);

        console.log(response.data);

        // Hide the newContacontabil input field
        this.showNewContacontabil = false;

      } catch (err) {
        swal('Erro ao atualizar conta contabil', 'Erro ao atualizar conta contabil.', 'error');
        console.error(err);
      }
    },
    confirmUpdateContacontabil() {
      if (this.conta.lote) {
        swal('Não é possível alterar a Conta Contábil', 'Remova o Lote da mesma pelo MV antes de prosseguir.', 'error');
      } else {
        this.showNewContacontabil = true;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }
};
</script>