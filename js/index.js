$(function(){

    // username
    var $username = $("#TANGRAM__PSP_4__userName");
    var $usernote = $("#TANGRAM__PSP_4__userNameTip");
    var $usererror = $("#TANGRAM__PSP_4__userNameError");
    $username.focus(function(){
        $username.addClass("pass-text-input-focus");
        $usernote.attr("style","display:block");
        $username.removeClass("pass-text-input-error");
    })
    $username.blur(function(){
        $username.removeClass("pass-text-input-focus");
        $usernote.attr("style","display:none");
        var result = usertest($username.val());
        if(result){
            $usererror.attr("style","display:inline");
            $username.addClass("pass-text-input-error");
        }
        $usererror.html(result);
        check();
    })
    var usertest = function(val){
        // null/''
        if(!val){
            return '用户名不能为空';
        }
        // character
        var reg = /[^\u4E00-\u9FA5\w]/;
        if(reg.test(val)){
            return '用户名仅支持中英文、数字和下划线,且不能为纯数字';
        }
        // all number
        reg = /\D/;
        if(!reg.test(val)){
            return '用户名仅支持中英文、数字和下划线,且不能为纯数字';
        }
        // length
        reg = /[\u4e00-\u9fa5]/g;
        var len = 0;
        for(var i=0;i<val.length;i++){
            if(reg.test(val.split("")[i])) {
                len+=2;
            }else{
                len+=1;
            }
        }
        if(len>14){
            return '用户名不能超过7个汉字或14个字符';
        }

        return '';
    }


    // phone
    var $phone = $("#TANGRAM__PSP_4__phone");
    var $phoneerror = $("#TANGRAM__PSP_4__phoneError");
    $phone.focus(function(){
        $phone.addClass("pass-text-input-focus");
        $phone.removeClass("pass-text-input-error");
    })
    $phone.blur(function(){
        phoneblur();
        check();
    })
    var phoneblur = function(){
        $phone.removeClass("pass-text-input-focus");
        var result = phonetest($phone.val());
        if(result){
            $phoneerror.attr("style","display:inline");
            $phone.addClass("pass-text-input-error");
        }
        $phoneerror.html(result);
        return result;
    }
    var phonetest = function(val){
        // null
        if(!val){
            return '手机号不能为空';
        }
        // format
        var reg = /^1[3456789]\d{9}$/;
        if(!reg.test(val)){
            return '手机号码格式不正确';
        }

        return '';
    }

    // password
    var $password = $("#TANGRAM__PSP_4__password");
    var $psderror = $("#TANGRAM__PSP_4__passwordError");
    $password.focus(function(){
        $password.addClass("pass-text-input-focus");
        $password.removeClass("pass-text-input-error");
    })
    $password.blur(function(){
        $password.removeClass("pass-text-input-focus");
        var result = psdtest($password.val());
        if(result){
            $psderror.attr("style","display:inline");
            $password.addClass("pass-text-input-error");
        }
        $psderror.html(result);
        check();
    })
    var psdtest = function(val){
        // null
        if(!val){
            return '密码不能为空';
        }

        var error = '';
        // character
        var reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]/;
        if(!reg.test(val)){
            error+= '字母/数字以及标点符号至少包含2种 ';
        }
        // chinese/space
        reg = /[\u4E00-\u9FA5\s]/;
        if(reg.test(val)){
            error+= '不允许有空格、中文 ';
        }
        // length
        var len = 0;
        for(var i=0;i<val.length;i++){
            if(reg.test(val.split("")[i])) {
                len+=2;
            }else{
                len+=1;
            }
        }
        if(len>14||len<8){
            error+= '长度为8~14个字符 ';
        }

        return error;
    }

    // codetext
    var $codetext = $("#TANGRAM__PSP_4__verifyCode");
    var $codeerror = $("#TANGRAM__PSP_4__verifyCodeError");
    $codetext.focus(function(){
        $codetext.addClass("pass-text-input-focus");
        $codetext.removeClass("pass-text-input-error");
    })
    $codetext.blur(function(){
        $codetext.removeClass("pass-text-input-focus");
        var result = codetexttest($codetext.val());
        if(result){
            $codeerror.attr("style","display:inline");
            $codetext.addClass("pass-text-input-error");
        }
        $codeerror.html(result);
        check();
    })
    var codetexttest = function(val){
        // null
        if(!val){
            return '验证码不能为空';
        }
        // format
        var reg = /^\d{6}$/;
        if(!reg.test(val)){
            return '验证码格式不正确';
        }

        return '';
    }

    // code
    var $codebtn = $("#TANGRAM__PSP_4__verifyCodeSend");
    $codebtn.click(function(){
        if(!phonetest($phone.val())){
            var num = 10;
            $codebtn.attr("disabled",true);
            $codebtn.removeClass("pass-button-verifyCodeSend");
            $codebtn.addClass("pass-text-input-disabled");
            var timer = setInterval(() => {
                if(num <= 0){
                    $codebtn.attr("disabled",false);
                    $codebtn.removeClass("pass-text-input-disabled");
                    $codebtn.addClass("pass-button-verifyCodeSend");
                    $codebtn.val("重新获取");
                    clearInterval(timer);
                }else{
                    $codebtn.val(num+'s');
                    num--;
                }
            }, 1000);
        }else{
            phoneblur();
        }
    })

    // agree
    var $agree = $("#TANGRAM__PSP_4__isAgree");
    var $agreeerror = $("#TANGRAM__PSP_4__isAgreeError");
    $agree.click(function(){
        if(!isagree()){
            $agreeerror.html("请同意相应协议即可注册");
            $agreeerror.attr("style","display:block");
        }else{
            $agreeerror.attr("style","display:none");
        }
        check();
    })
    var isagree = function(){
        var result = $agree.prop("checked");
        return result;
    }

    // form
    var $submit = $("#TANGRAM__PSP_4__submit");
    $submit.click(function(){
        check();
    })
    var check = function(){
        if(!(usertest($username.val())||phonetest($phone.val())||psdtest($password.val())||codetexttest($codetext.val())||!isagree())){
            $submit.attr("disabled",false);
            $submit.addClass("pass-button-new-submit");
            return true;
        }else{
            $submit.attr("disabled",true);
            $submit.removeClass("pass-button-new-submit");
            return false;
        }
    }

})