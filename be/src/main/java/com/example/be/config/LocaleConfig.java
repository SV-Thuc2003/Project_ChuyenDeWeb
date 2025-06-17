package com.example.be.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.*;

import java.util.List;
import java.util.Locale;

@Configuration

public class LocaleConfig extends AcceptHeaderLocaleResolver implements WebMvcConfigurer {
    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        String languageHeader = request.getHeader("Accept-Language");
        return StringUtils.hasLength(languageHeader)
                ? Locale.lookup(Locale.LanguageRange.parse(languageHeader), List.of(new Locale("en"), new Locale("vi")))
                : new Locale("vi"); // fallback mặc định
    }

    @Bean
    public LocaleResolver localeResolver() {
        return this; // chính là LocaleConfig đang kế thừa AcceptHeaderLocaleResolver
    }

    // Đọc các file messages_*.properties
    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource source = new ResourceBundleMessageSource();
        source.setBasename("messages"); // không cần phần mở rộng ".properties"
        source.setDefaultEncoding("UTF-8");
        source.setUseCodeAsDefaultMessage(true); // Nếu không tìm thấy key -> trả lại key
        return source;
    }
}


//    // Xác định ngôn ngữ từ request
//    @Bean
//    public LocaleResolver localeResolver() {
//        SessionLocaleResolver resolver = new SessionLocaleResolver();
//        resolver.setDefaultLocale(Locale.ENGLISH);
//        return resolver;
//    }
//
//    // Đổi locale qua tham số URL `?lang=vi`
//    @Bean
//    public LocaleChangeInterceptor localeChangeInterceptor() {
//        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
//        lci.setParamName("lang"); // ví dụ: /api/products?lang=vi
//        return lci;
//    }
//
//    @Bean
//    public WebMvcConfigurer localeConfigurer(LocaleChangeInterceptor interceptor) {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addInterceptors(InterceptorRegistry registry) {
//                registry.addInterceptor(interceptor);
//            }
//        };
//    }