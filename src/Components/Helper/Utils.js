import moment from 'moment'

 class Others {
    formatDate(date, pattern = "DD/MM/YYYY"){
        return moment(date).format(pattern);
    }

    getAnoCliente(date){
        let ano = new Date() - new Date(date)
        let duration = moment.duration(ano, 'milliseconds').years()
        return duration
    }

    validateForm(state){
        console.log(state)
        if (state.nome.valid && state.email.valid && state.cpf.valid && state.nascimento.valid && state.email.valid){
            return true;
        } else {
            return false;
        }
    }

    isValid(data){
        if(data === "" || data === undefined || data.length <= 2){
            return false;
        } else {
            return true;
        }
    }

    getClassValidation(status){
        if(status === ""){
            return ''
        } else if(status){
            return 'valid'
        } else {
            return 'invalid'
        }
    }

    resolveNameLogin(isLogin){
        if(isLogin){
            return "Login"
        } else {
            return "Cadastrar"
        }
    }

    getUser(){
        return localStorage.getItem('user');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    isAuthenticated(){
        return localStorage.getItem('authenticated');
    }

    Redirect(path){
        window.location.href = path
    }

    Logout(e){
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('authenticated');
        this.Redirect('/')
    }

    setUserSession(data){
        localStorage.setItem('authenticated', true);
        localStorage.setItem('user', data.usuario);
        localStorage.setItem('name', data.nome);
        localStorage.setItem('token', data.token);
    }

    getFirstName(name){
        let nome = String(name).split(' ');
        return nome[0];
    }

    ClientData(state){
        return {
            nome: state.nome.value,
            nascimento: state.nascimento.value,
            email: state.email.value,
            telefone: state.telefone.value,
            cpf: state.cpf.value
        }
    }
}

export default new Others()

