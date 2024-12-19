import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { MdPeopleAlt } from "react-icons/md";
import { Leavedata } from "../../leave/components/leavedata";
export const CountUser = ()=>{
  const user = useSelector((state: RootState) => state.user.users);
    return(
        <div className="grid">
            <div className="rounded-md shadow-md w-[250px] h-[100px]">
                <div className=" grid item-center p-4">
                    <div className="flex gap-2">
                        <div className="rounded-md shadow-sm p-2 bg-indigo-500">
                            <MdPeopleAlt color="white" />
                        </div>
                        <div className="font-sans text-lg pt-1">
                            Total Employee
                        </div>
                    </div>
                    <div className=" p-2 font-bold text-2xl">
                        {user.length}
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <Leavedata />
            </div>
        </div>
    )
}