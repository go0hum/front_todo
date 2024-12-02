
import { getTasks } from "@/api/TaskAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";

export default function DashboardView() {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
        retry: false
    });

    if (isLoading) return 'Cargando...';
    
    return (
        <>
            <nav className="mb-5 flex gap-3">
                <button className="bg-orange-500 hover:bg-orange-300 px-10 py-3 text-white text-xl font-bold cursor-pointer 
                transition-colors"
                type="button"
                onClick={() => navigate('?newTask=true')}
                >Add Task +</button>
            </nav>

            <TaskList 
                tasks={data ?? []}
            />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}