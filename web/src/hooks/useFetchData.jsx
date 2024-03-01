import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../utils/axios.config";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
          });

        // const res = await fetch(url, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

        // const result = await res.json();

        // if (!res.ok) {
        //   throw new Error(res.message);
        // }
        // setData(result.data);
        // setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
