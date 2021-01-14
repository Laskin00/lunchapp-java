package com.al.lunchapp.helpers;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.stereotype.Service;

@Service
public class HelperService {
	
	
	public static String generateNewToken() {
		SecureRandom secureRandom = new SecureRandom();
		Base64.Encoder base64Encoder = Base64.getUrlEncoder(); 
	    byte[] randomBytes = new byte[24];
	    secureRandom.nextBytes(randomBytes);
	    return base64Encoder.encodeToString(randomBytes);
	}

	public static String toJson(String type, String message) {
		return "{\"" + type + "\":\"" + message + "\"}";
	}
	
	public static String valueOfARepresentingKeyInJsonString(String key, String json) {
		String[] temp = json.replaceAll("\\{|\\}|\\s|", "").split(",");
		for(int i = 0; i < temp.length; i++){
			String[] currentKeyValue = temp[i].split("\":\"");
			if(key.equals(currentKeyValue[0].replaceAll("\"",""))){
				return currentKeyValue[1].replace("\"","");
			}
		}

		return null;
	}
}
