import { isAxiosError } from 'axios';
import api from "@/lib/axios";
import { dashboardTaskSchema, TaskFormData, Task, taskSchema } from "../types";

type TaskAPI = {
    formData: TaskFormData,
    taskId: Task['_id'],
    status: Task['status']
}

export async function createTask({formData} : Pick<TaskAPI, 'formData'>) {
    try {
        const url = `/tasks`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getTasks() {
    try {
        const { data } = await api('/tasks');
        const response = dashboardTaskSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch(error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}


export async function getTaskById({taskId} : Pick<TaskAPI, 'taskId'>) {
    try {
        const { data } = await api(`/tasks/${taskId}`);
        const response = taskSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch(error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateTask({taskId, formData} : Pick<TaskAPI, 'taskId' | 'formData'>) {
    try {
        const { data } = await api.put<string>(`/tasks/${taskId}`, formData);
        return data;
    } catch(error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteTask({taskId} : Pick<TaskAPI, 'taskId'>) {
    try {
        const { data } = await api.delete<string>(`/tasks/${taskId}`);
        return data;
    } catch(error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateStatus({taskId, status} : Pick<TaskAPI, 'taskId' | 'status'>) {
    try {
        const { data } = await api.post<string>(`/tasks/${taskId}/status`, {status});
        return data;
    } catch(error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}