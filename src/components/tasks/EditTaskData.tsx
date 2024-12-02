import { useLocation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from "@/api/TaskAPI";
import EditTaskModal from "./EditTaskmodal";
import { Navigate } from "react-router-dom";

export default function EditTaskData() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('editTask')!;

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({taskId}),
        enabled: !!taskId
    })

    if (isError) return <Navigate to={'/404'} />
    if (data) return <EditTaskModal data={data} taskId={taskId} />
}