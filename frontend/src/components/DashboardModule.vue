<template>
  <div>
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" />
    </div>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" />
    </div>
    <table id="user-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

export default {
  data() {
    return {
      username: '',
      name: '',
      dataTable: null,
    };
  },
  mounted() {
    this.initDataTable();
  },
  methods: {
    initDataTable() {
      this.dataTable = $(this.$el).find('#user-table').DataTable({
        serverSide: true, // Habilita o processamento no lado do servidor
        ajax: (dataTablesData, callback) => {
          const params = {
            username: this.username,
            name: this.name,
            ...dataTablesData,
          };

          axios.get('http://localhost:3000/api/users', { params })
            .then(response => {
              callback({
                draw: dataTablesData.draw,
                data: response.data,
                recordsTotal: response.data.length,
                recordsFiltered: response.data.length,
              });
            })
            .catch(error => {
              console.error('Erro ao buscar usuários:', error);
            });
        },
        columns: [
          { data: 'username' },
          { data: 'name' },
        ],
        paging: true, // Habilita a paginação
        pageLength: 10, // Número de usuários exibidos por página
      });
    },
  },
};
</script>
