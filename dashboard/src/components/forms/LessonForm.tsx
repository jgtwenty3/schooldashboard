"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { FieldError } from "react-hook-form"; // Import FieldError

const schema = z.object({
    subject: z.string().min(1, { message: "First name is required!" }),
    class: z.string().min(1, { message: "Class name is required!" }),
    teacher: z.string().email({ message: "Teacher Required!" }),
    
});

type Inputs = z.infer<typeof schema>;


const LessonForm =({
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
      } = useForm<Inputs>({
        resolver: zodResolver(schema),
      });
    
      const onSubmit = handleSubmit((data) => {
        console.log(data);
      });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a new Lesson" : "Update Lesson information"}</h1>

            <span className="text-xs text-gray-400 font-medium">Lesson Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject"
                    name="subject"
                    defaultValue={data?.subject}
                    register={register}
                    error={errors.subject as FieldError} // Pass FieldError object
                />
                <InputField
                    label="Class"
                    name="class"
                    defaultValue={data?.class}
                    register={register}
                    error={errors.class as FieldError} // Pass FieldError object
                />
                <InputField
                    label="Teacher"
                    name="teacher"
                    defaultValue={data?.teacher}
                    register={register}
                    error={errors.teacher as FieldError} // Pass FieldError object
                />
            
            </div>

            
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default LessonForm
