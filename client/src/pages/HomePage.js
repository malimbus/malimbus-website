import React from 'react'
import Features from '../components/Features/Features'
import Hero from '../components/Hero/Hero'
import RecentNews from '../components/RecentNews/RecentNews'
import FeaturesList from '../components/FeatureLists/FeaturesList'




const HomePage = () => {
  return (
    <div style={{backgroundColor: "#F5F5F5"}}>
        <Hero />
        <FeaturesList />
        <Features />
        <RecentNews />
    </div>
  )
}

export default HomePage
