import React from 'react'
import NewHeader from '../Home/NewUIHomepage/inc/NewHeader'
import NewFooter from '../Home/NewUIHomepage/inc/NewFooter'
import CountryWiseHospital from '../hospital-list/CountryWiseHospital'

const page = () => {
  return (
    <>
    <NewHeader />
    <CountryWiseHospital />
    <NewFooter />
    </>
  )
}

export default page