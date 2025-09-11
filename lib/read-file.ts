import { ReadAs } from "@/features/communities/types";

export const readFileAsync = (
  file: File,
  readAs: ReadAs
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const target = event.target;
      if (target) {
        const result = target.result;

        resolve(result);
      } else {
        reject(new Error("Invalid target"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Something has gone wrong while reading the file"));
    };

    reader[readAs](file);
  });
};
