import Navbar from '../NavbarComponent';
import Header from '../HeaderComponent';
import 'datatables.net';
import 'bootstrap/dist/css/bootstrap.css';


export default {
  name: 'HomeComponent',
  components: { Navbar, Header },
  computed: {
    moduleName: {
      get() {
        return this.$route.meta.moduleName; // Obter o valor da propriedade do componente filho
      },
      set(value) {
        this.$route.meta.moduleName = value; // Atualizar o valor da propriedade no componente filho
      },
    },
  },
};
