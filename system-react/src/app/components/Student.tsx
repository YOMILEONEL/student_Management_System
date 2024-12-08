"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import StudentTable from "./studentTable";

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
        console.log("New Student added");
        fetchStudents();
      } else {
        console.error("Failed to add student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setName("");
    setAddress("");
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/student/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Student deleted");
        fetchStudents();
      } else {
        console.error("Failed to delete student");
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
    <div className="general">
      <Paper 
  elevation={6} 
  sx={{ 
    margin: "20px auto", 
    padding: "30px", 
    textAlign: "center", 
    maxWidth: 500, 
    backgroundColor: "#f9f9f9", 
    borderRadius: "10px" 
  }}
>
  <h1 className="title" style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
    Add New Student
  </h1>
  <form className="input" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
    <Button 
      variant="contained" 
      onClick={handleAddStudent}
      sx={{
        padding: "10px",
        fontWeight: "bold",
        backgroundColor: "#1976d2",
        "&:hover": {
          backgroundColor: "#145a96"
        }
      }}
    >
      Submit
    </Button>
  </form>
</Paper>

      <StudentTable students={students} onDelete={handleDelete} />
    </div>
  );
}