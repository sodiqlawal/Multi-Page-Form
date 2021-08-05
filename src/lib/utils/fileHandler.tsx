export function readBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (e) => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
}
export async function readFilesBase64(files: File[]) {
  const results: string[] = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    // eslint-disable-next-line no-await-in-loop
    results.push(await readBase64(file));
  }
  return results;
}
