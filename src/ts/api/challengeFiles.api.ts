import api from "@cectf/api/api";
import { FileDescriptor } from "@cectf/types";

/**
 * Gets all the files for the given challenge.
 * 
 * @param challengeId the id of the challenge
 */
const getFiles = async function (
  challengeId: number
): Promise<FileDescriptor[]> {
  return api.get("/api/files/" + challengeId).then(async response => {
    if (response.status != 200) {
      return [];
    }
    return response.json();
  });
};

/**
 * Uploads a new file for a challenge.
 * 
 * @param challengeId the id of the challenge
 * @param file the file to upload
 */
const uploadFile = async function (
  challengeId: number,
  file: File
): Promise<void> {
  return api
    .upload("/api/files/" + challengeId, file)
    .then();
};

/**
 * Deletes a file from a challenge.
 * 
 * @param challengeId the id of the challenge
 * @param fileDescriptor the descriptor (filename, url) of the file to delete
 */
const deleteFile = async function (
  challengeId: number,
  fileDescriptor: FileDescriptor
): Promise<void> {
  return api
    .deleteHttp("/api/files/" + challengeId + "/" + fileDescriptor.name)
    .then();
};

export default {
  getFiles,
  uploadFile,
  deleteFile
};
