<template>
  <div>
    <table id="tabela-dados" class="display" style="width:100%">
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

export default {
  mounted() {
    this.initializeDataTable();
  },
  methods: {
    initializeDataTable() {
      $('#tabela-dados').DataTable({
        serverSide: true,
        searching: true, // Habilitar busca
        searchDelay: 500, // Atraso de busca de 500ms (opcional, ajuste conforme necessário)
        ajax: {
          url: 'http://localhost:3000/api/v1/getdata',
          type: 'GET',
          data: (data) => {
            // Adicionar parâmetros de busca
            data.search.value = data.search.value || ''; // Valor de busca (vazio se não houver)
          },
        },
        columns: [
          { data: 'username' }, // Coluna para o campo "username"
          { data: 'name' }, // Coluna para o campo "name"
        ],
      });
    },
  },
};
</script>
