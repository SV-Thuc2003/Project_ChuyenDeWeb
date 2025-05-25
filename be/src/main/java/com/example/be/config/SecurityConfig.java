package com.example.be.config;


import com.example.be.security.jwt.JwtAuthenticationFilter;
import com.example.be.security.oauth2.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Cấu hình bảo mật cho ứng dụng, bao gồm cài đặt CORS và OAuth2
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler successHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public AuthorizationRequestRepository<OAuth2AuthorizationRequest> authorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }

    /**
     * Định nghĩa chuỗi lọc bảo mật cho các request HTTP.
     * Vô hiệu CSRF, bật CORS, tắt form login mặc định và HTTP Basic,
     * thiết lập quyền truy cập cho các endpoint
     *
     * @param http đối tượng HttpSecurity để cấu hình
     * @return SecurityFilterChain đã được cấu hình
     * @throws Exception nếu cấu hình thất bại
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        HttpSecurity httpSecurity = http
                // Vô hiệu hóa csrf (chỉ tắt nếu xử lý csrf ở nơi khác
                .csrf(AbstractHttpConfigurer::disable)
//                Bật cors với cấu hình bên dưới
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .formLogin(AbstractHttpConfigurer::disable) // Disable login form nếu không dùng
                .httpBasic(AbstractHttpConfigurer::disable) // Disable basic auth nếu không dùng
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/oauth2/**").permitAll() // cho phép login/register/OAuth2
                        .requestMatchers("/api/products/**").permitAll()
                        .anyRequest().authenticated() //các route còn lại cần login
                )
                .oauth2Login(oauth -> oauth
                        .authorizationEndpoint(endpoint -> endpoint
                                .authorizationRequestRepository(authorizationRequestRepository())
                        )
                        .userInfoEndpoint(user -> user.userService(oAuth2UserService))
                        .successHandler(successHandler)
                        .failureHandler(new OAuth2AuthenticationFailureHandler())
                );
// add filter xử lý jwt trước khi nhấn vào UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /**
     * Cấu hình CORS cho toàn bộ ứng dụng.
     * Cho phép React fe (http://localhost:5173) truy cập API
     *
     * @return CorsConfigurationSource chứa cấu hình CORS
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
//        cho phép nguồn gốc từ React dev server
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
//        cho phép các phương thức HTTP  thông dụng
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        cho phép mọi header
        configuration.setAllowedHeaders(List.of("*"));
//        cho phép truyền credential  (cookie, header authorization
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // áp dụng cấu hình cho mọi đường dẫn
        source.registerCorsConfiguration("/**", configuration);
        return  source;

    }

    /**
     * Bean mã hóa mật khẩu sử dụng thuật toán BCrypt
     * @return PasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // ⚙️ Nếu bạn cần AuthenticationManager để login truyền thống
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
