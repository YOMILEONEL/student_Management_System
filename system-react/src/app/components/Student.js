"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Paper } from '@mui/material';

export default function Student() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents]= useState([]);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const student = { name, address};

    try {
      const response = await fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        console.log(student)
        console.log("New Student added");
      } else {
        console.error("Failed to add student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(()=>{
    fetch("http://localhost:8080/student/getAll")
    .then(res=> res.json())
    .then((result)=>{
      setStudents(result);
  })},[])

  return (
    <div className='general'>
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
            onChange={(e) =>  setAddress(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddStudent}>Submit</Button>
        </div>
        <Paper>
          <h1>Students</h1>
        <div>
          {students.map(student=>(
            <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
            Id: {student.id}<br/>
            Name: {student.name}<br/>
            Address:{student.address}<br/>
            </Paper>
          ))
          }
          
        </div>
        </Paper>
      
    </div>
  );
}
