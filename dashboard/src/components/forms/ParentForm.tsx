"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { FieldError } from "react-hook-form"; // Import FieldError

const schema = z.object({
    firstName: z.string().min(1, { message: "First name is required!" }),
    lastName: z.string().min(1, { message: "Last name is required!" }),
    email: z.string().email({ message: "Invalid email address!" }),
    phone: z.string().min(1, { message: "Phone is required!" }),
    address: z.string().min(1, { message: "Address is required!" }),
    students: z.array(
        z.object({
            name: z.string().min(1, { message: "Student name is required!" }),
            age: z.number().min(1, { message: "Age must be at least 1!" }),
        })
    ).min(1, { message: "At least one student is required!" })
});

type Inputs = z.infer<typeof schema>;

const ParentForm = ({
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
            students: data?.students || [{ name: "", age: null }] // Initialize with student data if available
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "students",
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        // Add logic to handle create or update action
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a new parent" : "Update parent information"}</h1>

            <span className="text-xs text-gray-400 font-medium">Personal Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="First Name"
                    name="firstName"
                    defaultValue={data?.firstName}
                    register={register}
                    error={errors.firstName as FieldError} // Pass FieldError object
                />
                <InputField
                    label="Last Name"
                    name="lastName"
                    defaultValue={data?.lastName}
                    register={register}
                    error={errors.lastName as FieldError} // Pass FieldError object
                />
                <InputField
                    label="Phone"
                    name="phone"
                    defaultValue={data?.phone}
                    register={register}
                    error={errors.phone as FieldError} // Pass FieldError object
                />
                <InputField
                    label="Address"
                    name="address"
                    defaultValue={data?.address}
                    register={register}
                    error={errors.address as FieldError} // Pass FieldError object
                />
            </div>

            <span className="text-xs text-gray-400 font-medium">Students</span>
            {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2">
                    <InputField
                        label={`Student Name ${index + 1}`}
                        name={`students.${index}.name`}
                        defaultValue={data?.students?.[index]?.name}
                        register={register}
                        error={errors.students?.[index]?.name as FieldError} // Pass FieldError object
                    />
                    <InputField
                        label={`Student Age ${index + 1}`}
                        type="number"
                        name={`students.${index}.age`}
                        defaultValue={data?.students?.[index]?.age}
                        register={register}
                        error={errors.students?.[index]?.age as FieldError} // Pass FieldError object
                    />
                    <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
                </div>
            ))}
            <button type="button" onClick={() => append({ name: "", age: null })} className="bg-gray-200 p-2 rounded-md">
                Add Student
            </button>

            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default ParentForm;
