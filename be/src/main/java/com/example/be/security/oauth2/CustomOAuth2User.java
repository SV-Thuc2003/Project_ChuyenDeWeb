package com.example.be.security.oauth2;

import com.example.be.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

/**
 * Wrapper cho OAuth2User để lấy thông tin người dùng từ Google/Facebook
 */
public class CustomOAuth2User implements OAuth2User {
    private final OAuth2User oAuth2User;
//    private final String provider;

    /**
     * Constructor truyền OAuth2User gốc vào và lưu tên provider (GOOGLE, FACEBOOK)
     *
     * @param oAuth2User OAuth2User gốc từ provider
     * @param provider tên nhà cung cấp OAuth2 (GOOGLE, FACEBOOK)
     */
    public CustomOAuth2User(OAuth2User oAuth2User, String provider){
        this.oAuth2User = oAuth2User;
//        this.provider = provider;
    }

    /**
     * Lấy tất cả các thuộc tính từ OAuth2User
     *
     * @return Map chứa các thuộc tính
     */
    @Override
    public Map<String, Object> getAttributes(){
        return oAuth2User.getAttributes();
    }

    /**
     * Lấy danh sách các quyền từ OAuth2User
     *
     * @return Collection chứa các GrantedAuthority
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return oAuth2User.getAuthorities();
    }

    /**
     * Lấy tên người dùng từ OAuth2User (key "name")
     *
     * @return tên người dùng
     */
    @Override
    public String getName(){
        return oAuth2User.getAttribute("name");
    }

    /**
     * Lấy email từ OAuth2 provider (key "email")
     *
     * @return email người dùng
     */
    public String getEmail() {
        return oAuth2User.getAttribute("email");
    }

    /**
     * Lấy ID người dùng từ OAuth2 provider (Google sử dụng "sub", Facebook sử dụng "id")
     *
     * @return ID người dùng
     */
    public String getId() {
        return oAuth2User.getAttribute("sub") != null ?
                oAuth2User.getAttribute("sub") : oAuth2User.getAttribute("id");
    }


}
