package com.example.be.security.oauth2;

import com.example.be.entity.User;
import com.example.be.entity.UserRoles;
import com.example.be.enums.Provider;
import com.example.be.enums.RoleName;
import com.example.be.enums.Status;
import com.example.be.repository.UserRepository;
import com.example.be.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private final UserRoleRepository roleRepository;

    /**
     * Tải người dùng từ OAuth2 provider và đăng ký nếu chưa tồn tại
     * @param userRequest yêu cầu người dùng OAuth2
     * @return OAuth2User đã được xử lý và lưu trữ nếu cần thiết
     * @throws OAuth2AuthenticationException nếu có lỗi xảy ra trong quá trình xác thực
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();
//        String providerId = oAuth2User.getName(); //Google users "sub", Facebook users "id"
        String providerId = switch (provider.toLowerCase()) {
            case "google" -> oAuth2User.getAttribute("sub");
            case "facebook" -> oAuth2User.getAttribute("id");
            default -> throw new OAuth2AuthenticationException("Unsupported provider: " + provider);
        };

        String email = oAuth2User.getAttribute("email");

        if (email == null) {
            throw new OAuth2AuthenticationException("Email not available form" + provider);
        }
        //if (email == null || email.isBlank()) {
        //    log.error("OAuth2 login failed: email not found from provider {}", provider);
        //    throw new OAuth2AuthenticationException("Email not available from provider: " + provider);
        //}

        User user = userRepository.findByEmail(email).orElseGet(() ->{
            User newUser = User.builder()
                    .email(email)
                    .username(email)
                    .password(UUID.randomUUID().toString())
                    .name(oAuth2User.getAttribute("name"))
                    .isVerified(true)
                    .provider(Provider.valueOf(provider.toUpperCase()))
                    .providerId(oAuth2User.getName())
                    .status(Status.ACTIVE)
                    .roles(new HashSet<>())
                    .build();
// Lấy role USER từ repository và thêm vào roles của người dùng
            UserRoles userRole = roleRepository.findByRoleName(RoleName.USER)
                    .orElseThrow(()-> new RuntimeException("Role not found"));
            newUser.getRoles().add(userRole);
            // Lưu người dùng mới vào cơ sở dữ liệu
            return userRepository.save(newUser);
        });
        // Trả về OAuth2User với thông tin người dùng từ provider
        return new CustomOAuth2User(oAuth2User, provider);
    }
}

