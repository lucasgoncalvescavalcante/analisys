<template>
  <div>
    <div>
  <label for="userStatusFilter">Filtrar por status:</label>
  <select id="userStatusFilter">
    <option value="">Todos</option>
    <option value="ativo">Ativos</option>
    <option value="inativo">Inativos</option>
  </select>
</div>
    <table id="listusers" class="display" style="width:100%">
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import language from 'datatables.net-plugins/i18n/pt-BR.mjs';

export default {
  mounted() {
    this.initializeDataTable();
  },
  methods: {
    initializeDataTable() {
      $('#listusers').DataTable({
        serverSide: true,
        processing: true,
        language,
        paging: true,
        searching: true, // Habilitar busca
        ordering: true,
        searchDelay: 10000, // Atraso de busca de 500ms (opcional, ajuste conforme necessário)
        ajax: {
          url: 'http://localhost:3000/api/v1/getdata',
          type: 'GET',
        },
        columns: [
          { data: 'username' }, // Coluna para o campo "username"
          { data: 'name' }, // Coluna para o campo "name"
          {  data: 'isactive',
            render: function (data) {
              if (data === 0) {
                return '<span class="badge bg-danger">Inativo</span>';
              } else if (data === 1) {
                return '<span class="badge bg-success">Ativo</span>';
              } else {
                return '';
              }
            }
          },      
          { data: 'editButton'},
        ],
      });
    },
  },
};
</script>
