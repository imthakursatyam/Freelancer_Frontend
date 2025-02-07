import {Hero, Footer, Static1, Static2, Static3, Static4} from "../components/ui/export.js";
export default function Home(){
  const startFetch = async () => {
    let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json"
       }
       let response = await fetch("http://localhost:8080/recruiter/check-cookie", { 
         method: "POST",
         headers: headersList,
         credentials: "include"
       });
       
       let data = await response.json();
       console.log(data)
}
  return <>
  <div>
        <button onClick={startFetch}>fetch</button>
    </div>
  <Hero/>
  <Static2/>
  <Static1/>
  <Static3/>
  <Static4/>
  </>
}