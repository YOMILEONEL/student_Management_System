package com.leonel.springboot.service;

import com.leonel.springboot.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
