package com.example.be.config;

import jakarta.servlet.http.HttpServletResponse;
import com.example.be.security.jwt.JwtAuthenticationFilter;
import com.example.be.security.oauth2.*;
import jakarta.servlet.http.HttpServletResponse;
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
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/oauth2/**").permitAll()
                        .requestMatchers("/api/products/**").permitAll()
                        .requestMatchers("/api/brands/**", "/api/categories/**").permitAll()
                        .requestMatchers("/api/admin/**").permitAll()
//                        .requestMatchers("/api/customers/**").hasRole("USER")
                        .requestMatchers("/api/favorites/**", "/api/cart/**").authenticated()   //.hasAnyRole("USER", "ADMIN") // cả user và admin
                        .requestMatchers("/api/shipping/fee").permitAll() // ✅ Cho phép public endpoint tính phí GH
                        .anyRequest().authenticated()

                )
                .exceptionHandling(exc -> exc
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // tránh bị redirect
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\": \"Unauthorized\"}");
                        })
                )
                .oauth2Login(oauth -> oauth
                        .authorizationEndpoint(endpoint -> endpoint
                                .authorizationRequestRepository(authorizationRequestRepository())
                        )
                        .userInfoEndpoint(user -> user.userService(oAuth2UserService))
                        .successHandler(successHandler)
                        .failureHandler(new OAuth2AuthenticationFailureHandler())
                );

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
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174", "http://localhost:3000"));
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
