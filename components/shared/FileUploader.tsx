'use client'

import { Dispatch, SetStateAction, useCallback } from "react"
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import type { FileWithPath } from "@uploadthing/react";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
    onFieldChange: (value: string) => void
    imageUrl: string
    setFiles: Dispatch<SetStateAction<File[]>>
}

const FileUploader = ({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles)
        onFieldChange(convertFileToUrl(acceptedFiles[0]))
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
    });

    return (
        <div
            {...getRootProps()}
            className="">
            <input {...getInputProps()} className="" />

            {imageUrl ? (
                <div className=" flex h-full w-full flex-1 justify-center">
                    <img src={imageUrl} alt="image" width={250} height={250} className="w-full object-cover object-center" />
                </div>
            ) : (
                <div className="flex justify-center items-center flex-col py-5 text-grey-500">
                    <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
                    <h3 className=" mb-2 mt-2">Drag photo here</h3>
                    <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                    <Button type="button" className="rounded-full">
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    );
}

export default FileUploader