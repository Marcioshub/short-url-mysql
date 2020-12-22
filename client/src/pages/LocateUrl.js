import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import PageNotFound from "../components/PageNotFound";
import Loading from "../components/Loading";

export default function LocateUrl(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  async function findUrl() {
    const response = await axios.get(`/api/url/${props.match.params.code}`);

    if (response.data.success && response.data.data.length > 0) {
      window.location.href = response.data.data[0].url;
    } else {
      setLoading(false);
      enqueueSnackbar("Url not found", {
        variant: "error",
      });
    }
  }

  useEffect(() => {
    findUrl();
    // eslint-disable-next-line
  }, []);

  return <>{loading ? <Loading /> : <PageNotFound />}</>;
}
