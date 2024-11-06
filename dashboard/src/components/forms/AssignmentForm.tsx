"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
    title: z.string().min(1, { message: "Assignment Title is required!" }),
    startDate: z.string().min(1, { message: "Start Date is required!" }),
    dueDate: z.string().min(1, { message: "Due Date is required!" }),
});

type Inputs = z.infer<typeof schema>;

const AssignmentForm = ({
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
        defaultValues: {
            title: data?.title || "",
            startDate: data?.startDate || "",
            dueDate: data?.dueDate || "",
        },
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        // Logic to handle create or update action goes here
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new assignment" : "Update assignment"}
            </h1>

            <div className="flex flex-col gap-4">
                <InputField
                    label="Assignment Title"
                    name="title"
                    defaultValue={data?.title}
                    register={register}
                    error={errors.title as FieldError}
                />

                <InputField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    defaultValue={data?.startDate}
                    register={register}
                    error={errors.startDate as FieldError}
                />

                <InputField
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    defaultValue={data?.dueDate}
                    register={register}
                    error={errors.dueDate as FieldError}
                />
            </div>

            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create Assignment" : "Update Assignment"}
            </button>
        </form>
    );
};

export default AssignmentForm;
