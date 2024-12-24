import { useParams } from "react-router-dom"
import { InterUser } from "./components/internalview";

export const UserDetail = ()=>{
    const { id } = useParams<{ id: string }>();
    return (
        <div className="w-full overflow-hidden">
            <InterUser id = {id}/>
        </div>
    )
}