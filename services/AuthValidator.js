import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrRole, setLogin } from '@/store/slices/authState';
import { useRouter } from "next/router.js";


export default function AuthValidator() {
    const router = useRouter();
    const dispatch = useDispatch();

    React.useEffect(async () => {
        const performanceEntry = window.performance.getEntriesByType("navigation")[0];
        if (performanceEntry && performanceEntry.type === "reload") {
            try {
                let headersList = {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
                let response = await fetch("http://localhost:8080/auth/status", {
                    method: "GET",
                    headers: headersList,
                    credentials: "include"
                });

                let data = await response.json();
                if (data.status == true) {
                    dispatch(setLogin({ val: true }));
                    dispatch(setCurrRole({ val: data.role }));
                } else router.push("/auth/login");
            } catch (err) {
              console.log(err)
            }
        }

    }, [])

    return (<></>)
}

