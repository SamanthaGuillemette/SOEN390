import { useEffect, useState } from "react";

const useFetchData = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
        .then(res => {return res.json()})
        .then(info => {
          setData(info);
        })
      }, [url])

    return {data};
}
 
export default useFetchData;