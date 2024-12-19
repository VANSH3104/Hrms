import { TaskBar } from "../Dashboard/Components/TaskBar";
import { setUserDetails } from "../features/userSlice";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToggleTask } from "./components/toggleTask";

export const TaskAssignments =()=>{
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.selectedUser);
  
    useEffect(() => {
      if (id) {
        dispatch(setUserDetails(id));
      }
    }, [id, dispatch]);
    return (
        <div>
            <TaskBar />
            <div className="pt-2 w-full">
            <ToggleTask />
            </div>
        </div>
    )
}