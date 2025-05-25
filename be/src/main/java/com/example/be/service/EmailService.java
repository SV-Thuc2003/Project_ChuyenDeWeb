package com.example.be.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendOtpEmail(String toEmail, String otpCode) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String subject = "Xác minh tài khoản của bạn";
            String body = "<p>Chào bạn,</p>"
                    + "<p>Mã OTP của bạn là: <strong>" + otpCode + "</strong></p>"
                    + "<p>OTP sẽ hết hạn sau 5 phút.</p>"
                    + "<br><p>Trân trọng,</p><p>Đội ngũ hỗ trợ</p>";

            helper.setText(body, true);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setFrom(fromEmail);  // ✅ Sửa tại đây

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Gửi email OTP thất bại", e);
        }
    }
}
