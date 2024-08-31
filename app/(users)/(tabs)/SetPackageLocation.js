import React from 'react'
import PackageOrder from '../../../components/Orders/PackageLocation'
import { useLocalSearchParams } from 'expo-router'

const SetPackageLocation = () => {
  const formData =useLocalSearchParams()
  console.log(formData);
  
  return (
    
    <PackageOrder/>
  )
}

export default SetPackageLocation