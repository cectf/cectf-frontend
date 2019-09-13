import api from "api/api";
import { FileDescriptor } from "types";

const getFiles = async function(
  challengeId: number
): Promise<FileDescriptor[]> {
  return api.get("/api/files/" + challengeId).then(async response => {
    if (response.status != 200) {
      return [];
    }
    return response.json();
  });
};

const uploadFile = async function(
  challengeId: number,
  file: File
): Promise<void> {
  return api.upload("/api/files/" + challengeId, file).then();
};

const deleteFile = async function(
  challengeId: number,
  file: FileDescriptor
): Promise<void> {
  return api
    .deleteHttp("/api/files/" + challengeId + "/" + file.name)
    .then(() => {
      return;
    });
};

export default {
  getFiles,
  uploadFile,
  deleteFile
};
