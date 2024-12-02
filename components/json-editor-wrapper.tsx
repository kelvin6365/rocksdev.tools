"use client";

import { JsonEditor } from "json-edit-react";

interface JsonEditorWrapperProps {
  data: any;
  setData: (data: any) => void;
  rootName?: string;
  restrictEdit?: boolean;
}

export default function JsonEditorWrapper({
  data,
  setData,
  rootName = "data",
  restrictEdit = false,
}: JsonEditorWrapperProps) {
  return (
    <JsonEditor
      className="!w-full !max-w-full !min-w-min h-full"
      data={data}
      setData={setData}
      rootName={rootName}
      restrictEdit={restrictEdit}
    />
  );
}
