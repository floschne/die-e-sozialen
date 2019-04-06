package org.dieesozialen.api.config;

import org.dieesozialen.api.controller.MainController;
import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@Configuration
@EnableSwagger2
@ComponentScan(basePackageClasses = MainController.class)
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(Predicates.not(PathSelectors.regex(".*error.*")))
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        ApiInfo apiInfo = new ApiInfo(
                "Die e-sozialen API",
                "The REST API (documentation) for the Service",
                "Test & Development",
                "#",
                new Contact("Florian Schneider", "#", "florian.schneider-1@studium.uni-hamburg.de"),
                "Apache License 2.0",
                "https://www.apache.org/licenses/LICENSE-2.0",
                Collections.emptyList());
        return apiInfo;
    }
}
