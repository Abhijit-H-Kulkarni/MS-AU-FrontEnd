package com.msau.backend.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.Deflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.msau.backend.repository.SubmissionRepository;
import com.msau.backend.models.Submission;
import org.springframework.web.multipart.MultipartFile;
import com.msau.backend.models.SubmissionId;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/submission")
public class SubmissionController {
	@Autowired
	SubmissionRepository submissionRepository;
	
	@GetMapping("/getallsubmissions")
	public List<Submission> getAllSubmission() {
		return submissionRepository.findAll();
	}
	
	@PostMapping("/getsubmissionbyid")
	public Optional<Submission> getSubmissionById(@RequestBody SubmissionId id) {
		return submissionRepository.findById(id);
	}
	
	@PostMapping("/dropsubmissionbyid")
	public void dropSubmission(@RequestBody SubmissionId id) {
		submissionRepository.deleteById(id);
	}
	
	@PostMapping("/getscore")
	public int getsumofscores(@RequestBody SubmissionId id) {
		return submissionRepository.getscore(id);
	}
	
	@PostMapping("/upload")
	public void upload(@RequestParam("imageFile") MultipartFile file, @RequestParam("uid") int uid, @RequestParam("assid") int aid, @RequestParam("score") String score) {
		Submission submission = new Submission();
		SubmissionId id = new SubmissionId();
		id.setAid(aid);
		id.setUid(uid);
		submission.setId(id);
		submission.setScore(Integer.parseInt(score));
		try {
			submission.setSolution(compressBytes(file.getBytes()));
		} catch (IOException e) {
			System.out.println(e.getStackTrace());
		}
		submissionRepository.save(submission);
	}
	
	public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
      try {
           outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }

	
}