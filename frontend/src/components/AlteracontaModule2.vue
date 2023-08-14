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
    </form>

    <table id="contasTable" class="display" style="width:100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Conta Contábil</th>
          <th>Período Início</th>
          <th>Período Fim</th>
          <th>Lote</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    
    <div class="form-group row mb-3">
      <div class="col-sm-2">
        <button type="button" class="btn btn-primary" @click="getSelectedIds()">Adicionar Linha</button>
        <button type="button" class="btn btn-primary" @click="selectAllRows()">selecionar todos</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-select';
import 'datatables.net-select-bs5/css/select.bootstrap5.min.css';
import axios from 'axios';

export default {
  data() {
    return {
      contasid: '',
      dataTable: null,
      contasapagar: {}
    };
  },
  methods: {
    async getContas() {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/getContas/${this.contasid}`);
        const data = response.data;

       // Limpa o corpo da tabela antes de adicionar novas linhas
        //this.dataTable.clear();

        // Adiciona novas linhas para cada item no array de dados
        data.forEach(item => {
          this.dataTable.row.add(item);
        });

        // Desenha a tabela com as novas linhas
        this.dataTable.draw();

        // Adiciona uma nova linha automaticamente
       // this.addNewRow();
        //const selectedids = this.getSelectedIds();
       // console.log('aqui estao os ids', selectedids);
      } catch (err) {
        console.error(err);
      }
    },
    getSelectedIds() {
      const selectedRowsData = this.dataTable.rows({ selected: true }).data().toArray();
      const selectedIds = selectedRowsData.map(row => row.id); // Verifica se o ID está sendo corretamente extraído
      console.log('Aqui estão os IDs selecionados:', selectedIds);
      return selectedIds;
    },
      selectAllRows() {
    const anySelected = this.dataTable.rows({ selected: true }).any();

    if (anySelected) {
      // Se pelo menos uma linha estiver selecionada, deseleciona todas
      this.dataTable.rows().deselect();
    } else {
      // Se nenhuma linha estiver selecionada, seleciona todas
      this.dataTable.rows().select();
    }
  }
  },
  mounted() {
    this.dataTable = $('#contasTable').DataTable({
      searching: false,
      paging: false,
      select: true,
      className: 'select-checkbox',
      columns: [
        { data: 'id' },
        { data: 'contacontabil' },
        { data: 'periodoInicio' },
        { data: 'periodoFim' },
        { data: 'lote' }
      ]
    });
  }
};

</script>
