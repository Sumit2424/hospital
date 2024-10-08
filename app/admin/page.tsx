import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.action'
import {DataTable} from '@/components/table/DataTable'
import {columns, Payment} from '@/components/table/columns'



const Admin = async() => {
    const appointments = await getRecentAppointmentList();
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
          <Link href="/" className='cursor-pointer'>
           <Image 
           src= "/assets/icons/logo-full.svg"
           height = {32}
           width={162}
           alt="Logo"
            />
          </Link>
          <p className='text-16-semibold'>Admin Dashboard</p>

      </header>
      <main className='admin-main'>
        <section className='w-full space-y-4'>
            <h1 className='header'>Welcome 👋</h1>
            <p className='text-dark-700'>Start today with managing new appointmnent</p>

        </section>
        <section className='admin-stat '>
        <StatCard
         type = "appointments"
         count={appointments.scheduledCount}
        //  pass the value here
         label="Scheduled appointment"
         icon= "/assets/icons/appointments.svg"
        />
        <StatCard
         type = "pending"
         count={appointments.PendingCount}
         label="Pending appointment"
         icon= "/assets/icons/pending.svg"
        />
        <StatCard
         type = "cancelled"
         count={appointments.cancelledCount}
         label="Cancelled appointment"
         icon= "/assets/icons/cancelled.svg"
        />
          
        </section>
        <DataTable columns={columns} data={appointments.documennt}/>
      </main>
    </div>
  )
}

export default Admin
