"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
   
    name: z.string().min(1, { message: "Subject Name is required!" }),
    teachers: z.array(
        z.object({
            firstName: z.string().min(1, { message: "First name is required!" }),
            lastName: z.string().min(1, { message: "Last name is required!" }),
        })
    )

    
  });
  
  type Inputs = z.infer<typeof schema>;

  const SubjectForm = ({
    type,
    data,
}: {
    type: "create" | "update";
    data?: any;
}) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            teachers: data?.teacher || [{ firstName: "", lastName: "" }] // Initialize with student data if available
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "teachers",
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        // Add logic to handle create or update action
    });
    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a new subject" : "Update subject information"}</h1>

            <span className="text-xs text-gray-400 font-medium">Subject Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors.name as FieldError} // Pass FieldError object
                />
                
            </div>

            <span className="text-xs text-gray-400 font-medium">Teachers</span>
            {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2">
                    <InputField
                        label={`Teacher First Name${index + 1}`}
                        name={`teachers.${index}.firstName`}
                        defaultValue={data?.teachers?.[index]?.firstName}
                        register={register}
                        error={errors.teachers?.[index]?.firstName as FieldError} // Pass FieldError object
                    />
                    <InputField
                        label={`Teacher Last Name${index + 1}`}
                        name={`teachers.${index}.lastName`}
                        defaultValue={data?.teachers?.[index]?.lastName}
                        register={register}
                        error={errors.teachers?.[index]?.lastName as FieldError} // Pass FieldError object
                    />
                    <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
                </div>
            ))}
            <button type="button" onClick={() => append({ firstName: "", lastName: "" })} className="bg-gray-200 p-2 rounded-md">
                Add Teacher
            </button>

            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default SubjectForm