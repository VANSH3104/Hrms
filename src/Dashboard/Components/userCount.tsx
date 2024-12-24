import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { MdPeopleAlt } from "react-icons/md";
import { Leavedata } from "../../leave/components/leavedata";
import { updateUserDetails } from "../../features/userSlice";
import { useEffect } from "react";
export const CountUser = ()=>{
  const user = useSelector((state: RootState) => state.user.users);
  console.log(user.length)
  const dispatch = useDispatch()
  useEffect(() => {
      const handleStorageChange = () => {
        try {
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            dispatch(updateUserDetails(JSON.parse(savedUser)));
          }
        } catch (error) {
          console.error("Error loading data from localStorage:", error);
        }
      };
      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }, [dispatch]);
  
    useEffect(() => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }, [user]);
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