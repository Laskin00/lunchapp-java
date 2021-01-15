package com.al.lunchapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import com.al.lunchapp.entities.Meeting;
import com.al.lunchapp.entities.User;
import com.al.lunchapp.exceptions.UserAuthenticationException;
import com.al.lunchapp.helpers.HelperService;
import com.al.lunchapp.repositories.MeetingUserConnectionRepository;
import com.al.lunchapp.repositories.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {
	//TODO add automated getting of meetings of user
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MeetingUserConnectionRepository meetingUserConnectionRepository;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	@PostMapping("/register")
	private String register(@RequestBody User newUser) {
		if(userRepository.findByEmail(newUser.getEmail()) != null){
			return HelperService.toJson("error", "Email already in use.");
		}
		try{
			newUser.setPassword(encoder.encode(newUser.getPassword()));
			userRepository.save(newUser);
			return HelperService.toJson("message","Register successfull!");
		}catch(DataIntegrityViolationException e){
			return HelperService.toJson("error", e.getMessage());
		}

	}
	
	@GetMapping("/{uuid}")
	private User user(@PathVariable String uuid) {
		return userRepository.findByUuid(uuid);
	}
	
	@PostMapping("/login")
	private String loginAndReturnSessionToken(@RequestBody ObjectNode emailAndPasswordInJson) {
		String email = emailAndPasswordInJson.get("email").asText();
		String password = emailAndPasswordInJson.get("password").asText();
		User user;
		try{
			 user = authenticateAndReturnUser(email, password);
			 String newSessionToken = HelperService.generateNewToken();
			 user.setSessionToken(newSessionToken);
			 userRepository.save(user);
			 return HelperService.toJson("sessionToken",newSessionToken);
		}catch(UserAuthenticationException e){
			return HelperService.toJson("error", e.getMessage());
		}
	}

	@PostMapping("/logout")
	private String logout(@RequestBody String sessionToken){
		User user = getUserBySessionTokenInJson(userRepository,sessionToken);
		if(user == null){
			return "Incorrect sessionToken";
		}
		user.setSessionToken(null);
		userRepository.save(user);
		return "Logout successful.";
	}

	@GetMapping("/get")
	private User getUserBySessionToken(@RequestBody String sessionToken){
		return getUserBySessionTokenInJson(userRepository,sessionToken);
	}
	
	@GetMapping("/meetings")
	private List<Meeting> getAllMeetingsOfAUser(@RequestBody String sessionTokenJson){
		User user = getUserBySessionTokenInJson(userRepository,sessionTokenJson);
		List<Meeting> meetings = meetingUserConnectionRepository.getMeetingsOfUser(user);
		return meetings;
		
	}
	
	private User authenticateAndReturnUser(String email, String password) {
		User user = userRepository.findByEmail(email);
		if(encoder.matches(password, user.getPassword())) {
			return user;
		}else {
			throw new UserAuthenticationException("Wrong email or password !");
		}
	}
	
	public static User getUserBySessionTokenInJson(UserRepository userRepository,String jsonBody) {
		String sessionToken = HelperService.valueOfARepresentingKeyInJsonString("sessionToken",jsonBody);
		return userRepository.findBySessionToken(sessionToken);
	}
	
}

