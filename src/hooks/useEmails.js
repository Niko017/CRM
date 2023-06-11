import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "constant/constantes";
export function useEmails(){
    const [emails, setEmails] = useState([]);
    const cargarEmails = async() => {
        const { data } = await axios.get(`${BASE_URL}/emails`);
        setEmails(data);
    }
    
    useEffect(()=> {
        cargarEmails();
    },[])
    
    return { emails, setEmails ,cargarEmails  }
}