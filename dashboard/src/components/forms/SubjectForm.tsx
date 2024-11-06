"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { SubjectSchema, subjectSchema } from "@/lib/formValidationSchemas";




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
        formState: { errors },
    } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            teachers: data?.teacher || [{ firstName: "", lastName: "" }] // Initialize with student data if available
        },
    });


    const onSubmit = handleSubmit((data) => {
        console.log(data);
        // Add logic to handle create or update action
    });
    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a new subject" : "Update subject information"}</h1>

            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors.name as FieldError} // Pass FieldError object
                />
                
            </div>

            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default SubjectForm