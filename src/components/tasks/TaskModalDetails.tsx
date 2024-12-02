import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { statusText } from '@/locales/en';
import { taskStatus } from '@/types/index';

export default function TaskModalDetails() {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;
    const show = taskId ? true :  false;

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({taskId}),
        enabled: !!taskId,
        retry: false
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['tasks'] })
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as taskStatus
        const data = { taskId, status }
        mutate(data)
    }

    if (isError) {
        toast.error(error.message, {toastId: 'error'});
        return <Navigate to={`/`} />
    }
  
    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
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
                                        className="font-black text-4xl text-slate-600 mb-5"
                                    >{data.taskname}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Description: {data.description}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Current Status:</label>
                                        <select className='w-full p-3 bg-white border-gray-300'
                                        defaultValue={data.status}
                                        onChange={handleChange}>
                                            { Object.entries(statusText).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}