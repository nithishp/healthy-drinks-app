import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const Sliders = ({sliderList}) => {
  console.log('slider List',sliderList)

  return (
    <Carousel>
  <CarouselContent>
    {sliderList.map((slider,index)=>(
    <CarouselItem key={index}>
      <Image src={slider.attributes?.image?.data[0].attributes?.url} width={1000} height={400} alt='slider' className='w-full h-[200px] md:h-[400px] object-cover rounded-2xl'/>
    </CarouselItem>

    ))}
   
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

  )
}

export default Sliders