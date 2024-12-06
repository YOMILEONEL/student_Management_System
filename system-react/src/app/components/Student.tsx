"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Paper } from '@mui/material';

interface Student {
  id: number;
  name: string;
  address: string;
}

export default function Student() {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);

  const handleAddStudent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const student = { name, address };

    try {
      const response = await fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        console.log(student);
        console.log("New Student added");
        // Reload students list after adding
        fetchStudents();
      } else {
        console.error("Failed to add student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8080/student/getAll");
      const result = await response.json();
      setStudents(result);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);


  return (
    <div className='general'>
      <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }}>
        <h1 className='title'>Add new Student</h1>
        <div className='input'>
          <TextField
            id="student-name"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="student-address"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddStudent}>Submit</Button>
        </div>
      </Paper>
      <Paper>
        <h1>Students</h1>
        <div>
          {students.map(student => (
            <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
              Id: {student.id}<br />
              Name: {student.name}<br />
              Address: {student.address}<br />
              <Button variant="contained" color='error'>Delete</Button>
            </Paper>
          ))}
        </div>
      </Paper>
    </div>
  );
}
