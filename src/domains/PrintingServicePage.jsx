import React from "react";
import PrintingServiceStore from "../stores/PrintingServiceStore";
import DataTable from "../components/DataTable";

const PrintingServicePage = () => {
  return (
    <DataTable 
      storeGet = { PrintingServiceStore.GetPrintingService }
      storeDelete = { PrintingServiceStore.DeletePrintingService}
      storeSave = { PrintingServiceStore.SavePrintingService }
      idField = { PrintingServiceStore.idField }
      sampleRow = { PrintingServiceStore.sampleRow}
      contentColumns = { PrintingServiceStore.printingServiceColumns }
      visibilityModel = { PrintingServiceStore.visibilityModel }
      pageTitle = { PrintingServiceStore.pageTitle }
      pageSubtitle = { PrintingServiceStore.pageSubtitle }
    />
  )
};

export default PrintingServicePage;
