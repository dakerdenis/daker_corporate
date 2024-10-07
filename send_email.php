<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $number = $_POST['number'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $contactMethod = $_POST['contact_method'];

    // Validate the email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address']);
        exit();
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // SMTP server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'dakerdenis@gmail.com'; // Your Gmail address
        $mail->Password = 'tynqkuiwcvnukzex'; // Your Gmail password or App Password if 2FA is enabled
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        // Set the sender and recipient
        $mail->setFrom('dakerdenis@gmail.com', 'Denis Akershteyn');
        $mail->addAddress('contact@daker.site');

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body    = "
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Number:</strong> $number</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Preferred Contact Method:</strong> $contactMethod</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        // Send the email
        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Email successfully sent!']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Email could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

