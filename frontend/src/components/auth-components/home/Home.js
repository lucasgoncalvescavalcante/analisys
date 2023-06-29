import $ from 'jquery';
import axios from 'axios';
import Navbar from '../../NavbarComponent';
import 'datatables.net';
import 'bootstrap/dist/css/bootstrap.css';
import Api from '../../../services/Api';

export default {
  name: 'HomeComponent',
  components: { Navbar },
  data() {
    return {
      users: [],
      dataTable: null,
    };
  },
  mounted() {
    this.getUsersFromAPI();
  },
  methods: {
    getUsersFromAPI() {
      console.log('teste');
      console.log(Api());
      axios.get('http://localhost:3000/api/v1/users') // Rota para obter os usuários
        .then((response) => {
          this.users = response.data;
          this.initDataTable();
        })
        .catch((error) => {
          console.log(Api());
          console.log('asdasdasd');
          console.error(error);
        });
    },
    initDataTable() {
      const table = $(this.$el).find('#myTable'); // Obtenha a referência da tabela

      // Certifique-se de que o DataTable foi destruído antes de recriá-lo
      if ($.fn.DataTable.isDataTable(table)) {
        table.DataTable().destroy();
      }

      this.$nextTick(() => {
        // Inicialize o DataTable com as configurações desejadas
        table.DataTable({
          data: this.users, // Defina os dados do DataTable como os usuários
          columns: [
            { data: 'name' }, // Defina a coluna 'name'
            { data: 'username' }, // Defina a coluna 'username'
          ],
        });
      });
    },
  },
};
