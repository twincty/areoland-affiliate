import { saveAs } from "file-saver";
import * as JSZip from "jszip";
import * as JSZipUtils from "jszip-utils";

const zip = new JSZip();

const exportFiles = async (folderName, exportData) => {
  let count = 0;

  exportData.forEach(async (obj) => {
    try {
      const data = await JSZipUtils.getBinaryContent(obj.url);
      zip.file(obj.name, data, { binary: true });
      count++;
      if (count === exportData.length) {
        const content = await zip.generateAsync({ type: "blob" });
        await saveAs(content, folderName);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

export default exportFiles;
