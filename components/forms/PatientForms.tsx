"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
export enum FormFieldType{
   INPUT = 'input',
   TEXTAREA = 'textarea',
   Phone_INPUT ='phoneinput',
   CHECKBOX = 'checkbox',
   DATE_PICKER ='datepicker',
   SELECT = 'select',
   SKELETON = 'skeleton',
}


const PatientForms = () => {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })
   async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = {name,email,phone}
      const user = await createUser(userData);
      if(user)  router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header"> Hi There 👋 </h1>
          <p className="text-dark-700">Schedule Your First Appointment.</p>
        </section>
        <CustomFormField
           fieldType ={FormFieldType.INPUT}
           name = "name"
           label = "Full name"
           placeholder ="Your Name"
           iconSrc = "/assets/icons/user.svg"
           iconAlt = "user"

           control ={form.control}       
        />
         <CustomFormField
           fieldType ={FormFieldType.INPUT}
           name = "email"
           label = "Email"
           placeholder ="yourname@any.com"
           iconSrc = "/assets/icons/email.svg"
           iconAlt = "email"  
           control ={form.control}        
        />
         <CustomFormField
           fieldType ={FormFieldType.Phone_INPUT}
           name = "phone"
           label = "phone no."
           placeholder ="(+555) 555-1234" 
           control ={form.control}          
        />
        
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )

}
export default PatientForms

