"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl} from "@/components/ui/form"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForms"
import CustomFormField from "../CustomFormField"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "../ui/label"
import {
  Doctors, 
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";

import FileUploader from "../FileUploader";

// import CustomFormField from "../CustomFormField"


const RegisterForm = ({user} : {user: User}) => {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,  
      name: "",
      email:"",
      phone:"",
    },
  })
   async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    let formData;
    if(values.identificationDocument && values.identificationDocument.length > 0 ){
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
       const patientData = {
        ...values,
        userId: user.$id,
        birthDate : new Date(values.birthDate),
        identificationDocument : formData,
       }  
      //  @ts-ignore 
       const newPatient = await registerPatient(patientData);
       
      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }   
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className=" space-y-4">
          <h1 className="header"> Welcome 👋 </h1>
          <p className="text-dark-700">Let us know More about yourself.</p>
        </section>
        <section className=" space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Personal Information.</h2>
          </div>
          
        </section>
        <CustomFormField
           fieldType ={FormFieldType.INPUT}
           name = "name"
           label="Full Name"
           placeholder ="Your Name"
           iconSrc = "/assets/icons/user.svg"
           iconAlt = "user"

           control ={form.control}       
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
           label = "phone no"
           placeholder ="(+555) 555-1234" 
           control ={form.control}          
        />
        
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
           fieldType ={FormFieldType.DATE_PICKER}
           name = "birthdate"
           label = "Date of Birth"
           control ={form.control}        
        />
         <CustomFormField
           fieldType ={FormFieldType.SKELETON}
           name = "gender"
           label = "Gender"
           renderSkeleton={(field) => (
            <FormControl>
              <RadioGroup className="flex h-11 gap-6 xl:justify-between"
              onValueChange={field.onChange}
              defaultValue="{field.value}">
               {GenderOptions.map((option :string, i:number) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
              </RadioGroup>
            </FormControl>
           )}
           control ={form.control}          
        />    
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
           fieldType ={FormFieldType.INPUT}
           name = "address"
           label = "Address"
           placeholder ="Enter your address"
            
           control ={form.control}        
        />
        <CustomFormField
           fieldType ={FormFieldType.INPUT}
           name = "occupation"
           label = "Occupation"
           placeholder ="Enter your occupation"
           control ={form.control}        
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
           fieldType ={FormFieldType.INPUT}
           name = "emergencyContactName"
           label = "Emergency contact name"
           placeholder ="Guardian's name"
             
           control ={form.control}        
        />
         <CustomFormField
           fieldType ={FormFieldType.Phone_INPUT}
           name = "emergencyContactNumber"
           label = "Emergency contact Number"
           placeholder ="Guardian's number" 
           control ={form.control}          
        />
        
        </div>
        {/* div lgana hai */}
        <section className=" space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Medical Information.</h2>
          </div>
        </section>
        <CustomFormField
           fieldType ={FormFieldType.SELECT}
           name = "primaryPhysician"
           label = "Primary Physician"
           placeholder ="Select a physician" 
           control ={form.control}          
        >
             {Doctors.map((doctor) => (
              <SelectItem key={doctor.name } value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
        </CustomFormField>
        
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
           fieldType ={FormFieldType.INPUT}
           name = "insuranceProvider"
           label = "Insurance Provider"
           placeholder ="Enter your insurance company"
            
           control ={form.control}        
        />
        <CustomFormField
           fieldType ={FormFieldType.INPUT}
           name = "insurancePolicyNumber"
           label = "Insurance Policy Number"
           placeholder ="Enter your Policy no."
           control ={form.control}        
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
           fieldType ={FormFieldType.TEXTAREA}
           name = "allergies"
           label = "Allergies (if any)"
           placeholder ="Peanuts, Pollen, Mold"
            
           control ={form.control}        
        />
        <CustomFormField
           fieldType ={FormFieldType.TEXTAREA}
           name = "currentMedication"
           label = "Current Medication (if any)"
           placeholder ="Enter your current medication"
           control ={form.control}        
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
           fieldType ={FormFieldType.TEXTAREA}
           name = "familyMedicalHistory"
           label = "Family medical history"
           placeholder ="Enter your family medical history "
            
           control ={form.control}        
        />
        <CustomFormField
           fieldType ={FormFieldType.TEXTAREA}
           name = "pastMedicalHistory"
           label = "Past medical history"
           placeholder ="Enter your Past medical history"
           control ={form.control}        
        />
        </div>
        <section className=" space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Identification & Verification.</h2>
          </div>
          
        </section>
        <CustomFormField
           fieldType ={FormFieldType.SELECT}
           name = "identificationType"
           label = "Identification type"
           placeholder ="Select a Document" 
           control ={form.control}          
        >
             {IdentificationTypes.map((type) => (
              <SelectItem key = {type} value ={type} >
                {type}
              </SelectItem>
            ))}
        </CustomFormField>
        <CustomFormField
           fieldType ={FormFieldType.INPUT}
           name = "identificationNumber"
           label="Identification number"
           placeholder ="Enter Your Identification Number"
           control ={form.control}       
        />
        <CustomFormField
           fieldType ={FormFieldType.SKELETON}
           name = "identificationDocument"
           label = "Scanned copy of identification document"
           renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value}
              onChange={field.onChange}/>
            </FormControl>
           )}
           control ={form.control}          
        />
        <section className=" space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Consent and Privacy.</h2>
          </div>
        </section> 
        <CustomFormField 
        fieldType={FormFieldType.CHECKBOX}
        name = "treatmentConsent"
        label = "I Consent to treatment"
        control={form.control}
        />
        <CustomFormField 
        fieldType={FormFieldType.CHECKBOX}
        name = "disclosureConsent"
        label = "I Consent to disclosure of information"
        control={form.control}
        />
        <CustomFormField 
        fieldType={FormFieldType.CHECKBOX}
        name = "privacyConsent"
        label = "I Consent to privacy policy "
        control={form.control}
        />   
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )

}
export default RegisterForm

