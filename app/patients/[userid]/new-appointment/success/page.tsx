import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getAppointment } from '@/lib/actions/appointment.action'
import { Doctors } from '@/constants'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const Success = async ({params : { userId },searchParams} :SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || ' ';
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)
  return (
    <div className='flex-h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href='/'>
         <Image 
         src="/assets/icons/logo-full.svg"
         height={1000}
         width= {1000}
         alt="logo"
         className="h-10 w-fit"
         />
        </Link>
        <section className='flex flex-col items-center'>
           <Image 
           src="/assets/gifs/success.gif"
           height={300}
           width={280}
           alt="success"   
           />
        <h2 className='header mb-6 max-w-[600px] text-center'>
           Your <span className='text-green-500'>appointhelooment request</span> has been succesfully SubmitButton!

        </h2>
        <p>We'll be in touch shortly to confirm.</p>
        </section>
        <section className='request-details :'>
          <p>Requested appointment detail</p>
          <div className='flex items-center gap-3'>
            <Image
            src={doctor?.image!}
            alt='doctor'
            width={100}
            height={100}
            className='size-6'
            // error ki wjh se code na chl rha 3:14

            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className='flex gap-2'>
            <Image 
             src="/assets/icons/calendar.svg"
             height={24}
             width={24}
             alt='calendar'
            />
           <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant="outline" className='shad-primary-btn' asChild> 
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className='copyright'> 
          ©2024 
        </p>
         
      </div>
    </div>
  )
}

export default Success
