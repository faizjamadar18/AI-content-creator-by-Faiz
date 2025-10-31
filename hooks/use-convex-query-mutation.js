
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { useEffect,useState } from "react";


export const useConvexQuery = (query, ...args) => {
  const result = useQuery(query, ...args);

  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ✅ While loading, do nothing except indicate loading
    if (result === undefined) {
      setIsLoading(true);
      return; // ← very important
    }

    // ✅ Once data arrives, update state
    try {
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [result]);

  return { data, isLoading, error };
};

export function useConvexMutation(mutation) { // this custom hook returns three things mutation Function which can be called anywhere to mutate data, mutated data, isloading (true or false) , error(in the form of toast) , it does not have useeffect beacause To run on manual action (like add/edit/delete) only when you call it.

    let mutationFn = useMutation(mutation) // useMutation() doesn’t return data directly,
    // it returns a callable function that executes the mutation on the backend when you use it.

    const [data, setdata] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState(null)

    const mutate = async(...args)=>{
        setisLoading(true)
        seterror(null)

        try{
            const resposnse = await mutationFn(...args)
            setdata(resposnse)
            return resposnse
        }catch(err){
            seterror(err)
            toast.error(err.message)
        }finally{
            setisLoading(false)
        }     
    }
    return{
        mutate, // it return a function which can be used in the code to  to mutate the particular data  
        data,   // The result after mutation succeeds 
        isLoading,
        error
    }

}


//  What it returns :                                     
//  useQuery() : The **data** itself                                  
//  useMutaion() : A function that you can call to run the mutation
