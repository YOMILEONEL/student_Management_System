package com.leonel.springboot.service;

import com.leonel.springboot.model.Student;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
    public ResponseEntity<Void> deleteStudent(int id);
}
