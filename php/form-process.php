<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Nombre is required";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}

// MSG SUBJECT
if (empty($_POST["asunto"])) {
    $errorMSG .= "Subject is required ";
} else {
    $asunto = $_POST["asunto"];
}


// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["message"];
}

//canada.viajes@tigo.com.py
$EmailTo = "canada.viajes@tigo.com.py";
$Subject = $asunto;
$email_desde = "correos@canadaviajes.com.py";

// prepare email body text
$Body = "";
$Body .= "Nombre: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Asunto: ";
$Body .= $asunto;
$Body .= "\n";
$Body .= "Mensaje: ";
$Body .= $message;
$Body .= "\n";

$headers = "From: $email_desde\r\n"; 
$headers .= "Reply-To: $email\r\n";
$headers .= "Return-Path:  $email\r\n";

// send email
$success = mail($EmailTo, $Subject, $Body, $headers);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "Enviado";
}else{
    if($errorMSG == ""){
        echo "���Completaste el formulario correctamente? :(";
    } else {
        echo $errorMSG;
    }
}

?>