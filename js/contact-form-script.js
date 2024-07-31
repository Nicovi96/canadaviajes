$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formErrorInferior();
        submitMSGInferior(false, "Error");
    } else {
        // everything looks good!
        event.preventDefault();
        submitFormInferior();
    }
});

function submitFormInferior(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var asunto = $("#asunto").val();
    var message = $("#message").val();
    var url= "name=" + name + "&email=" + email + "&asunto=" + asunto + "&message=" + message;
    console.log(url);

    $.ajax({
        type: "POST",
        url: "/php/form-process.php",
        data: url,
        success : function(text){
            if (text == "Enviado"){
                formSuccessInferior();
            } else {
                formErrorInferior();
                submitMSGInferior(false,text);
            }
        }
    });
}

function formSuccessInferior(){
    $("#contactForm")[0].reset();
    var lang = $("#lang").val();
    if(lang == "es"){
        submitMSGInferior(true, "Enviado correctamente!")
    }
    if(lang == "en"){
        submitMSGInferior(true, "Sending Correctly!")
    }
    if(lang == "deu"){
        submitMSGInferior(true, "trankilovsky!")
    }
}

function formErrorInferior(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSGInferior(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}