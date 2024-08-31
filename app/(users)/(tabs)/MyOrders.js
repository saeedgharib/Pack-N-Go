import React from 'react'
import Order from '../../../components/Orders/order'
import { router } from 'expo-router'

const MyOrders = () => {
  const ProceedNext=(formData) => {
    router.push({
      pathname:'/SetPackageLocation',
      params: formData
    })
  }
  return (
    <Order proceed={ProceedNext}/>
  )
}

export default MyOrders
