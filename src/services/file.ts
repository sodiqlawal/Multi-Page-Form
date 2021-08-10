import { env } from "config/environment";

const { baseUrl } = env;
async function uploadFile(file: File) {
  const fd = new FormData();

  fd.append("file", file);

  try {
    const response = await fetch(`${baseUrl}/upload`, {
      method: "post",
      body: fd,
    })
      .then((res) => res.json())
      .then((data) => {
        return data?.payload.data;
      });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { uploadFile };
