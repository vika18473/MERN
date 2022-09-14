import React, { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { LinkCard } from "../components/LinkCard"
import { Loader } from "../components/Loader"
import { useParams } from "react-router-dom"

 export const DeteilPage = ()=>{
   const {token} = useContext(AuthContext)
   const {request, loading} = useHttp()
   const [link, setLink] = useState(null)
   const linkId = useParams().id

   const getLink = useCallback(async ()=> {
try {
   const fetched = await request (`/api/link/${linkId}`, "GET", null, {
      Authorization: `Bearer ${token}`

   })
   setLink(fetched)
} catch (e) {}
   }, [token, linkId, request])

   useEffect( ()=>{
   getLink()
   }, [getLink])

   if(loading){
      return <Loader />
   }

    return(
    <>
   {!loading && link && <LinkCard link = {link}/>}
    </>)
 }