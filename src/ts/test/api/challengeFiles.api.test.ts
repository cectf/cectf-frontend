import challengeFilesApi from "@cectf/api/challengeFiles.api";
import { FileDescriptor } from "@cectf/types";

import fetchMock = require("fetch-mock");

afterEach(() => {
  fetchMock.reset();
});

const challengeId = 1;
const files = ["a.txt", "b.zip"];
const fileDescriptor: FileDescriptor = { name: "name", url: "url" };
const file: File = { lastModified: 1, name: "name", type: "type", size: 0, slice: () => new Blob() };

it("getFiles", async () => {
  fetchMock.getOnce("/api/files/" + challengeId, files);

  expect.assertions(3);
  return challengeFilesApi.getFiles(challengeId)
    .then(actualFiles => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/files/" + challengeId);
      expect(actualFiles).toEqual(files);
    });
});

it("getFiles failure", async () => {
  fetchMock.getOnce("/api/files/" + challengeId, 400);

  expect.assertions(3);
  return challengeFilesApi.getFiles(challengeId)
    .then(actualFiles => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/files/" + challengeId);
      expect(actualFiles).toEqual([]);
    });
});

it("deleteFile", async () => {
  fetchMock.deleteOnce("/api/files/" + challengeId + "/" + fileDescriptor.name, files);

  expect.assertions(2);
  return challengeFilesApi.deleteFile(challengeId, fileDescriptor)
    .then(() => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/files/" + challengeId + "/" + fileDescriptor.name);
    });
});

it("uploadFile", async () => {
  fetchMock.postOnce("/api/files/" + challengeId, files);

  expect.assertions(2);
  return challengeFilesApi.uploadFile(challengeId, file)
    .then(() => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/files/" + challengeId);
    });
});