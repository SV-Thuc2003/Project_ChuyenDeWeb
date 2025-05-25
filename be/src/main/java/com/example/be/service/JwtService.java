package com.example.be.service;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Service xử lý liên quna đến JWT: tạo, xác thực trích xuất thông tin từ token.
 */
@Service
public class JwtService {
    // khóa bí mật dùng đế ký token
    private final String SECRET_KEY = "mySuperSecretKeyThatIsLongEnoughToBeSecure12345678901234567890";
    // tạo SecurityKey từ chuỗi bí mật (dùng thuật toán HMAC SHA)
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    /**
     * Tạo JWT có chưa email làm subject
     * @param email đại chỉ email sẽ lưu vào token
     * @return chuỗi JWT đã ký
     */
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email) // subject là email người dùng
                .setIssuedAt(new Date()) // thời điểm phát hành token
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // hết hạn sau 1 day
                .signWith(key, SignatureAlgorithm.HS256) // ký bằng khóa bí mật
                .compact(); // tạo chuỗi jwt
    }

    /**
     * Lấy email (subject) từ JWT
     *
     * @param token JWT từ client
     * @return địa chỉ email bên trong token
     */
    public String getUsernameFromToken(String token) {
        return parseClaims(token).getBody().getSubject(); // lấy subject từ phần thân (body) của JWT
    }

    /**
     * Kiểm tra token có hợp lệ hay không.
     * Bao gồm: chưa hết hạn, chữ ký đúng, đinh dạng đúng.
     *
     * @param token JWT từ client
     * @return true nếu hợp lệ, false nếu không
     */
    public boolean validateToken (String token) {
        try {
            parseClaims(token); // sẽ throw nếu token không hợp lệ
            return true;
        } catch (ExpiredJwtException e) {
            System.err.println("Token hết hạn");
        } catch (UnsupportedJwtException e) {
            System.err.println("Token không được hỗ trợ");
        } catch (MalformedJwtException e) {
            System.err.println("Token sai định dạng");
        } catch (SecurityException e) {
            System.err.println("Chữ ký không hợp lệ");
        } catch (IllegalArgumentException e) {
            System.err.println("Token rỗng");
        }
        return false;
    }

    /**
     * Phân tích JWT thành đối tượng Claims để trích xuất thông tin hoặc xác thực.
     *
     * @param token JWT từ client
     * @return đối tượng Jws chứa Claims bên trong token
     */
    private Jws<Claims> parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key) // thiết lập khóa dùng để kiểm tra chữ ký
                .build()
                .parseClaimsJws(token); // phân tích JWT

    }

    public LocalDateTime extractExpiration(String token){
        Claims claims = parseClaims(token).getBody();
        Date expiration = claims.getExpiration();
        return expiration.toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDateTime();
    }
}


