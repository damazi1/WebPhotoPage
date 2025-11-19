package com.example.photopage.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path projectRoot = Path.of(System.getProperty("user.dir"));
        // Jeśli jesteś w podkatalogu (np. PhotoPage), przejdź poziom wyżej
        if (projectRoot.endsWith("PhotoPage")) {
            projectRoot = projectRoot.getParent();
        }
        Path uploadsPath = projectRoot.resolve("uploads");
        String absolutePath = uploadsPath.toAbsolutePath().toUri().toString();

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(absolutePath);
    }
}

