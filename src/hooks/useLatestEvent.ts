import { useEffect, useState } from "react";
import { getLatestEvent, type LatestEvent } from "../api/services/eventService";

export const useLatestEvent = () => {
  const [eventData, setEventData] = useState<LatestEvent | null>(null);
  const [eventLoading, setEventLoading] = useState(true);
  const [eventError, setEventError] = useState<any>(null);

  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const res = await getLatestEvent();
        setEventData(res.LatestEvent);
      } catch (err) {
        setEventError(err);
      } finally {
        setEventLoading(false);
      }
    };

    fetchLatestEvent();
  }, []);

  return { eventData, eventLoading, eventError };
};
