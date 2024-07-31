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

// asunto
if (empty($_POST["asunto"])) {
    $errorMSG .= "Subject is required ";
} else {
    $asunto = $_POST["asunto"];
}


// MSG SUBJECT
if (empty($_POST["telefono"])) {
    $errorMSG .= "Phone is required ";
} else {
    $telefono = $_POST["telefono"];
}

// habitaciones
if (empty($_POST["habitaciones"])) {
    $errorMSG .= "Habitaciones is required ";
} else {
    $habitaciones = $_POST["habitaciones"];
}

// habitaciones
if (empty($_POST["inicioviaje"])) {
    $errorMSG .= "Inicio viaje is required ";
} else {
    $inicioviaje = $_POST["inicioviaje"];
}


// habitaciones
if (empty($_POST["finviaje"])) {
    $errorMSG .= "Fin viaje is required ";
} else {
    $finviaje = $_POST["finviaje"];
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["message"];
}

// canada.viajes@tigo.com.py
$EmailTo = "canada.viajes@tigo.com.py";
$email_desde = "correos@canadaviajes.com.py";
$Subject = $asunto;

// prepare email body text
$Body = "";
$Body .= "Nombre:  $name \n";
$Body .= "Email:  $email \n";
$Body .= "Asunto:  $asunto \n";
$Body .= "Telefono:  $telefono \n";
$Body .= "Habitaciones:  $habitaciones \n";
$Body .= "Inicio Viaje:  $inicioviaje \n";
$Body .= "Fin viaje:  $finviaje \n";
$Body .= "Mensaje:  $message \n";

$headers = "From: $email_desde\r\n"; 
$headers .= "Reply-To: $email\r\n";
$headers .= "Return-Path:  $email\r\n";


// send email
$success = mail($EmailTo, $Subject, $Body,$headers);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "Enviado";
}else{
    if($errorMSG == ""){
        echo "Haben Sie das Formular korrekt ausgef���llt? :(";
    } else {
        echo $errorMSG;
    }
}

?>