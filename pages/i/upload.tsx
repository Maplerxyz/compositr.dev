import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import CenterBox from "../../components/utility/container/centerbox";

import "react-toastify/dist/ReactToastify.min.css";
import ThumbnailBar from "../../components/img/display/ThumbnailBar";

export interface Uploaded {
  resourceID?: string;
  filename: string;
  uuid: string;
}

interface Files {
  raw: Uint8Array;
  type: string;
  size: number;
}

export default function Upload() {
  const [apiKey, setApiKey] = useState("");

  const [files, setFiles] = useState<Files[]>([]);
  const [ringStyle, setRingStyle] = useState("");
  const [uploaded, setUploaded] = useState<Uploaded[]>([]);
  const onChange = (e: any) => setApiKey(e.target.value);
  const onRemove = () => {
    setFiles([]);
    setUploaded([]);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!apiKey) {
      setTimeout(() => setRingStyle(""), 1000);
      toast.error("Please enter your API key");
      return setRingStyle("ring-red-500 ring-2");
    }
    if (!apiKey.match(/^[a-zA-Z0-9]{42}$/)?.length)
      return toast.error("Please enter a valid API key");

    // Ask server to make resumable uploads
    const resumables = [];
    for (const file of files) {
      const filename = Date.now().toString();
      const r = fetch(`/api/v1/img/`, {
        method: "POST",
        body: JSON.stringify({ filename }),
        headers: {
          "X-Image-Mimetype": file.type,
          "X-Image-Size": file.size.toString(),
          Authorization: `Bearer ${apiKey}`,
        },
      });
      toast.promise(r, {
        success: "Registered image",
        pending: "Registering an image...",
        error: "Error registering an image",
      });
      const res = await r;
      const json = await res.json();
      const { message, data } = json;
      if (res.status !== 201 || data === null) {
        let human: string;
        switch (res.status) {
          case 401:
            human = "Unauthorized";
            break;

          default:
            break;
        }
        // @ts-expect-error
        return toast.error(human);
      }
      setUploaded((u) => [...u, { filename, uuid: data.uuid }]);
      resumables.push(data);
    }

    // Upload images
    toast.promise(
      Promise.all(
        resumables.map(async (upload, i) => {
          const file = files[i];
          try {
            const firstRes = await fetch(
              `/api/v1/img/partial/${upload.uuid}/`,
              {
                method: "POST",
                body: file.raw,
                headers: {
                  "X-Image-Mimetype": file.type,
                  Authorization: `Bearer ${apiKey}`,
                  "Content-Type": "multipart/mixed",
                },
              }
            );
            if (firstRes.status !== 200) {
              throw new Error("Something went wrong");
            }
            const json = await firstRes.json();
            setUploaded((u) => {
              const i = u.findIndex((u) => u.uuid === upload.uuid);
              const copy = [...u];
              copy[i].resourceID = json.data.image.resourceID;
              copy[i].filename = json.data.image.filename;
              console.log(copy[i]);
              return copy;
            });
          } catch (err) {
            throw new Error(`Error uploading image #${i + 1}. Error ${err}`);
          }
        })
      ),
      {
        success: "Images uploaded!",
        pending: "Uploading images...",
        error: "Error uploading images!",
      }
    );
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading aborted");
      reader.onerror = () => console.log("file reading failed");
      reader.onload = () => {
        // Turn the file into an ArrayBuffer
        const binaryStr = reader.result;
        if (!binaryStr || typeof binaryStr === "string") return;
        const raw = new Uint8Array(binaryStr);
        setFiles((files) => [
          ...files,
          { raw, type: file.type, size: file.size },
        ]);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <ToastContainer position="bottom-right" />
      <CenterBox>
        <div
          className="p-24 m-2 border border-[6px] border-dashed border-purple-500 text-center rounded hover:bg-gray-800"
          {...getRootProps()}
        >
          <p className="font-semibold text-xl text-purple-500">
            Drag and Drop to Upload
          </p>
          <p className="text-gray-500">
            (Accepted formats are jpg, jpeg, png, gif &amp; webp. Max. 8MB)
          </p>

          <input {...getInputProps()} />
          <p>{files.length} files in queue</p>
        </div>
        <div className="mt-4">
          <form id="uploadConfirmer" onSubmit={onSubmit}>
            <input
              type="password"
              className={`bg-transparent border border-gray-600 border-[3px] rounded-xl focus:(ring-2 ring-green-500 ring-offset-3 ring-offset-card-bg) p-1 w-[100%] ${ringStyle}`}
              placeholder="API Key"
              autoComplete="off"
              id="apiKey"
              onChange={onChange}
            />
            <button
              className="bg-green-400 rounded font-bold mt-4 p-2"
              type="submit"
            >
              Upload Images
            </button>
            <button
              className="bg-red-400 rounded font-bold mt-4 p-2 ml-2"
              type="reset"
              onClick={onRemove}
            >
              Clear Form
            </button>
          </form>
        </div>
        <ThumbnailBar uploaded={uploaded} />
      </CenterBox>
    </>
  );
}
