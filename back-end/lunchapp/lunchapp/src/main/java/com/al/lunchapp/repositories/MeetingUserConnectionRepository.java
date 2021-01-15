package com.al.lunchapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.al.lunchapp.entities.Meeting;
import com.al.lunchapp.entities.MeetingUserConnection;
import com.al.lunchapp.entities.User;

import javax.transaction.Transactional;

public interface MeetingUserConnectionRepository extends JpaRepository<MeetingUserConnection, Long> {

	@Query("SELECT muc.user FROM MeetingUserConnection muc WHERE muc.meeting = ?1")
	List<User> getUsersOfMeeting(Meeting meeting);
	
	@Query("SELECT muc.meeting FROM MeetingUserConnection muc WHERE muc.user = ?1")
	List<Meeting> getMeetingsOfUser(User user);

	@Transactional
	@Modifying
	@Query("DELETE FROM MeetingUserConnection muc WHERE muc.meeting = ?1")
	void deleteMeetingUserConnectionByMeeting(Meeting meeting);

	@Query("SELECT muc FROM MeetingUserConnection muc WHERE muc.meeting = ?1 AND muc.user = ?2")
	MeetingUserConnection getMeetingUserConnectionByMeetingAndUser(Meeting meeting, User user);

	@Transactional
	@Modifying
	@Query("DELETE FROM MeetingUserConnection muc WHERE muc.meeting = ?1 AND muc.user = ?2")
	void deleteMeetingUserConnectionByMeetingAndUser(Meeting meeting, User user);
}