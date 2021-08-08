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
