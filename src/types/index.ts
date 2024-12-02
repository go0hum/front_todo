import { z } from 'zod';

/* Tasks */
export const taskStatusSchema = z.enum(["pending", "inProgress", "completed"]);
export type taskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    taskname: z.string(),
    description: z.string(),
    status: taskStatusSchema
});


export const dashboardTaskSchema = z.array(
    taskSchema.pick({
        _id: true,
        taskname: true,
        description: true,
        status: true
    })
)
export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'taskname' | 'description'>

