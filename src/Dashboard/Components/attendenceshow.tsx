import { useParams } from "react-router-dom";
import { AttendanceChart } from "../../attendence/components/attendenceGraph"


export const AttendanceShow = ()=>{
    const { id } = useParams<{ id: string }>();
    return(
        <div className="h-full">
            <div className="h-full">
            <AttendanceChart  id= {id}/>
            </div>
        </div>
    )
}