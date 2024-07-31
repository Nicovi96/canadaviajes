$("#form-modal").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Error");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name-modal").val();
    var email = $("#email-modal").val();
    var asunto = $("#asunto-modal").val();
    var telefono = $("#telefono-modal").val();
    var habitaciones = $("#habitaciones").val();
    var inicioviaje = $("#inicioviaje").val();
    var finviaje = $("#finviaje").val();
    var message = $("#message-modal").val();
    var url= "name=" + name + "&email=" + email + "&asunto=" + asunto + "&message=" + message + "&telefono=" + telefono + "&habitaciones=" + habitaciones + "&inicioviaje=" + inicioviaje + "&finviaje=" + finviaje;
    console.log(url);

    $.ajax({
        type: "POST",
        url: "/php/form-modal.php",
        data: url,
        success : function(text){
            if (text == "Enviado"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#form-modal")[0].reset();
    var lang = $("#lang").val();
    if(lang == "es"){
        submitMSG(true, "Enviado correctamente!")
    }
    if(lang == "en"){
        submitMSG(true, "Message sent!")
    }
    if(lang == "deu"){
        submitMSG(true, "Nachricht gesendet!")
    }
}

function formError(){
    $("#form-modal").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit-modal").removeClass().addClass(msgClasses).text(msg);
}