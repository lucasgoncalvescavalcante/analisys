import swal from 'sweetalert';
import RegisterService from '@/services/RegisterService';
import Navbar from '../../NavbarComponent';

export default {
  name: 'RegisterComponent',
  components: { Navbar },
  data() {
    return {
      mostrarSenha: false,
      RegisterForm: {
        name: null,
        username: null,
        password: null,
        funtionId: null,
      },
      isSubmitted: false,
    };
  },
  methods: {
    RegisterSubmitUserForm() {
    },
    async submitRegisterUser() {
      try {
        this.isSubmitted = true;
        console.log('teste');

        await RegisterService.registerNewUser(this.RegisterForm);
        swal({
          title: 'Parabéns',
          text: 'Usuário registrado com sucesso',
          icon: 'success',
        });
        this.$router.push('/');
        console.log('teste23232');
      } catch (error) {
        console.log(error);
        swal({
          title: 'Oops',
          text: 'Alguma coisa deu errado aqui',
          icon: 'error',
        });
      }
    },
    alternarExibicaoSenha() {
      this.mostrarSenha = !this.mostrarSenha;
    },
  },
};
