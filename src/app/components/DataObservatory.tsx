import { getObservatoryData } from "@/lib/observatory";

import { DataObservatoryClient } from "./DataObservatoryClient";

export async function DataObservatory() {
  const initialData = await getObservatoryData();

  return <DataObservatoryClient initialData={initialData} />;
}
