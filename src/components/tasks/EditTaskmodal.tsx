import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { updateTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

type EditTaskModalProps = {
    data: Task,
    taskId: Task['_id']
}

export default function EditTaskModal({data, taskId}: EditTaskModalProps) {

    const navigate = useNavigate();

    const {register, handleSubmit, reset, formState: {errors} } = useForm<TaskFormData>({defaultValues: {
        taskname: data.taskname,
        description: data.description
    }});

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true});
        }
    })

    const HandleEditTask = (formData: TaskFormData) => {
        const data = {
            formData,
            taskId
        }
        mutate(data);
    }

    return (
        <>
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate('', {replace: true})}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Edit task
                                </Dialog.Title>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(HandleEditTask)}
                                    noValidate
                                >
                    
                                    <TaskForm
                                        register={register}
                                        errors={errors}
                                    />
                    
                                    <input
                                        type="submit"
                                        className="bg-orange-500 w-full hover:bg-orange-300 px-10 py-3 text-white text-xl font-bold cursor-pointer 
                transition-colors"
                                        value='Edit Task'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
        
    )
}