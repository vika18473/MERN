import React, { useCallback, useContext, useEffect, useState } from "react"
import {AuthContext} from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { Loader } from "../components/Loader"
import { LinkList } from "../components/LinkList"

 export const LinksPage = ()=>{
const [links, setLinks] = useState([])
 const {loading, request}= useHttp()
 const {token} = useContext(AuthContext)

 const fetchLinks = useCallback(async () => {
try {
   const fetched = await request("/api/link", "GET", null, {
      Authorization : `Baerer ${token}`
   })
   setLinks(fetched)
} catch (e ) {}
},[token, request])

useEffect( ()=> {
   fetchLinks()
}, [fetchLinks])


if(loading){
   return <Loader/ >
}

    return(
      <>
{!loading && <LinkList links={links} />}
      </>
    )
 }