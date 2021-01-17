package com.al.lunchapp.controllers;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import com.al.lunchapp.entities.Meeting;
import com.al.lunchapp.entities.MeetingUserConnection;
import com.al.lunchapp.entities.User;
import com.al.lunchapp.helpers.HelperService;
import com.al.lunchapp.repositories.MeetingRepository;
import com.al.lunchapp.repositories.MeetingUserConnectionRepository;
import com.al.lunchapp.repositories.UserRepository;

@RestController
@CrossOrigin(origins = "localhost:3000")
@RequestMapping("/meeting")
public class MeetingController {
	//TODO add  generation of meeting with random users
	@Autowired
	private MeetingRepository meetingRepository;
	
	@Autowired
	private MeetingUserConnectionRepository meetingUserConnectionRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/{uuid}")
	private Meeting getMeetingByUuid(@PathVariable String uuid) {
		return meetingRepository.findByUuid(uuid);
	}
	
	@PostMapping("/create")
	private String createMeetingAndReturnItsUuid(@RequestBody String meetingAndSessionToken) {
		String sessionToken = HelperService.valueOfARepresentingKeyInJsonString("sessionToken",meetingAndSessionToken);
		String description = HelperService.valueOfARepresentingKeyInJsonString("description", meetingAndSessionToken);
		String location = HelperService.valueOfARepresentingKeyInJsonString("location", meetingAndSessionToken);
		String dateString = HelperService.valueOfARepresentingKeyInJsonString("date", meetingAndSessionToken);
		String timeString =  HelperService.valueOfARepresentingKeyInJsonString("time", meetingAndSessionToken);
		User user = userRepository.findBySessionToken(sessionToken);
		System.out.println(user);
		Meeting meeting = new Meeting();
		meeting.setDescription(description);
		meeting.setLocation(location);
		if(dateString != null){
			meeting.setDate(Date.valueOf(dateString));
		}
		if(timeString != null){
			meeting.setTime(Time.valueOf(timeString));
		}
		meetingRepository.save(meeting);
		try {
			joinMeeting(user, meeting, true);
			return HelperService.toJson("meetingUuid", meeting.getId());
		}catch(DataIntegrityViolationException e){
			return HelperService.toJson("error",e.getMessage());
		}
	}

	@GetMapping("/owner/{uuid}")
	private User getOwner(@PathVariable String uuid){
		Meeting meeting = meetingRepository.findByUuid(uuid);
		return meetingUserConnectionRepository.getMeetingOwner(meeting);
	}
	@DeleteMapping("/delete/{uuid}/{sessionToken}")
	private String deleteMeeting(@PathVariable String uuid, @PathVariable String sessionToken){
		User user = userRepository.findBySessionToken(sessionToken);
		Meeting meeting = meetingRepository.findByUuid(uuid);
		if(user == null) {
			return "Invalid sessionToken.";
		}else if(meeting == null){
			return "Invalid meeting uuid.";
		}
		MeetingUserConnection muc = meetingUserConnectionRepository.getMeetingUserConnectionByMeetingAndUser(meeting,user);
		if(!muc.isOwner()){
			return "User must own the meeting to be able to delete it.";
		}
		meetingUserConnectionRepository.deleteMeetingUserConnectionByMeeting(meeting);
		meetingRepository.deleteByUuid(meeting.getId());
		return "Meeting deleted successfully";
	}
	@PostMapping("/join/{inviteToken}")
	private String joinByInviteToken(@PathVariable String inviteToken, @RequestBody String sessionToken) {
		User invited = UserController.getUserBySessionTokenInJson(userRepository,sessionToken);
		if(invited == null){
			return HelperService.toJson("error","Invalid sessionToken");
		}
		Meeting invitedTo = meetingRepository.findByInviteToken(inviteToken);
		if(invitedTo == null){
			return HelperService.toJson("error","Invalid inviteToken");
		}
		try {
			joinMeeting(invited, invitedTo, false);
			return HelperService.toJson("message", "You have joined the meeting successfully");
		}catch(DataIntegrityViolationException e){
			return HelperService.toJson("error", e.getMessage());
		}
	}

	@PostMapping("/leave/{uuid}")
	private String leaveByUuid(@PathVariable String uuid, @RequestBody String sessionToken){
		User leaver = UserController.getUserBySessionTokenInJson(userRepository,sessionToken);
		if(leaver == null){
			return HelperService.toJson("error","Invalid sessionToken");
		}
		Meeting toLeave = meetingRepository.findByUuid(uuid);
		if(toLeave == null){
			return HelperService.toJson("error","Invalid inviteToken");
		}
		MeetingUserConnection muc = meetingUserConnectionRepository.getMeetingUserConnectionByMeetingAndUser(toLeave,leaver);
		if(muc == null){
			return HelperService.toJson("message","You've already left the meeting or it has been deleted.");
		}
		if(muc.isOwner()){
			return HelperService.toJson("message","You must delete the meeting instead.");
		}else{
			meetingUserConnectionRepository.deleteMeetingUserConnectionByMeetingAndUser(toLeave,leaver);
			return HelperService.toJson("message","You have left the meeting successfully.");
		}
	}
	
	@GetMapping("/{uuid}/inviteToken")
	private String getInviteToken(@PathVariable String uuid) {
		return HelperService.toJson("inviteToken",meetingRepository.getInviteTokenOfMeeting(uuid));
	}
	
	@GetMapping("/{uuid}/users")
	private List<User> getAttenders(@PathVariable String uuid) {
		Meeting meeting = meetingRepository.findByUuid(uuid);
		return meetingUserConnectionRepository.getUsersOfMeeting(meeting);
	}
	
	private void joinMeeting(User invited, Meeting invitedTo, boolean isOwner) throws DataIntegrityViolationException {
		meetingUserConnectionRepository.save(new MeetingUserConnection(invitedTo,invited,isOwner));

	}
	

}
