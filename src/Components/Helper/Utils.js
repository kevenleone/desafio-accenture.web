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
        if(this.isValid(state.nome) && this.isValid(state.email) && this.isValid(state.cpf) && this.isValid(state.nascimento) && this.isValid(state.email)){
            return true;
        } else {
            return false;
        }
    }

    isValid(data, type = "str"){

        if(data === "" || data === null || data === undefined){
            return false;
        } 

        switch(type){
            case "date":
                return moment(data).isValid()
            default:
                return true;
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

