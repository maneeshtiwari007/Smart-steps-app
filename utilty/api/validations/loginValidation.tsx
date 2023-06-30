export const LoginValidation = {
    async validateEmailNasPass(params:any={}){
        var errors={email:false,password:false};
        if(params?.email==""){
            errors.email = true;
        }
        if(params?.password==""){
            errors.password = true;
        }
        return errors;
    },
    async validataion(params:any={}){
        var errors={title:false,category:false};
        if(params?.title==""){
            errors.title = true;
        }
        if(params?.category==""){
            errors.category = true;
        }
        return errors;
    },
    async validateHelp(params:any={}){
        var errors={name:false,email:false,description:false};
        if(params?.email==""){
            errors.email = true;
        }
        if(params?.name==""){
            errors.name = true;
        }
        if(params?.description==""){
            errors.description = true;
        }
        return errors;
    },
    async validateChangePassword(params:any={}){
        var errors={password:false,password_confirmation:false};
        if(params?.password==""){
            errors.password = true;
        }
        if(params?.password_confirmation==""){
            errors.password_confirmation = true;
        }
        if(params?.password_confirmation!=="" && params?.password_confirmation!==params?.password){
            errors.password_confirmation = true;
        }
        return errors;
    }
}