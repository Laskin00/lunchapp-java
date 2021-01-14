package com.al.lunchapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class LunchappApplication {

	public static void main(String[] args) {
		SpringApplication.run(LunchappApplication.class, args);
	}

}
