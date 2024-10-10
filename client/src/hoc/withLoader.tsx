import apiCall from '@/utils/apiCall'
import { Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export default function withLoader(Element:any,reqData:any) {
const [data,setData ] = useState<any>(null)

  useEffect(()=>{
   ; (async()=>{
    const response:any = await apiCall(reqData)
    setData(response)
    })()
    
  },[])

if(data?.status!==200){
  return(
    <>
      <Spinner  color="secondary" labelColor="secondary" className='absolute'/>
    </>
  )
}

  return (
   <Element data={data} />
  )
}
