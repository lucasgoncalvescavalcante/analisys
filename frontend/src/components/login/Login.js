import swal from 'sweetalert';
import LoginService from '@/services/LoginService';

export default {
  name: 'LoginComponent',
  data() {
    return {
      mostrarSenha: false,
      loginForm: {
        username: null,
        password: null,
      },
      isSubmitted: false,
    };
  },
  methods: {
    loginSubmitUserForm() {},
    alternarExibicaoSenha() {
      this.mostrarSenha = !this.mostrarSenha;
    },
    async submitLoginUser() {
      try {
        console.log('aqui a fita');
        console.log(this.loginForm);
        await LoginService.loginUser(this.loginForm);
        this.$router.push('/dash');
        swal({
          title: 'Sucesso!',
          text: 'Usuário Logado com Sucesso',
          icon: 'success',
        });
      } catch (err) {
        console.log(err);
        swal({
          title: 'Erro!',
          text: 'Erro ao logar no sistema',
          icon: 'error',
        });
      }
    },
  },
};
