import Image from "next/image";
import ButtonAppBar from "./components/AppBar"
import Student from "./components/Student"


export default function Home() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <Student/>
    </div>
  );
}
