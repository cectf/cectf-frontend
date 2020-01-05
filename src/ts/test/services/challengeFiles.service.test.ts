import api from "@cectf/api/challengeFiles.api";
import service from "@cectf/services/challengeFiles.service";
import { store } from "@cectf/state";
import * as actions from "@cectf/state/actions";

const challenge = {
  id: 7,
  title: "",
  category: "category",
  author: "author",
  body: "body",
  solution: "solution",
  previousChallenge: 6
};
const files = [{ name: "name", url: "url" }];
const file: File = { lastModified: 1, name: "name", type: "type", size: 0, slice: () => new Blob() };

it("updateChallengeFiles", async () => {
  var getFiles = jest.fn(() => Promise.resolve(files));
  api.getFiles = getFiles;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(3);
  return service.updateChallengeFiles(challenge).then(() => {
    expect(getFiles.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.setChallengeFiles(challenge.id, files)]);
  }).then(() => { });
});

it("uploadChallengeFile", async () => {
  var uploadFile = jest.fn(() => Promise.resolve());
  api.uploadFile = uploadFile;
  var getFiles = jest.fn(() => Promise.resolve(files));
  api.getFiles = getFiles;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(4);
  return service.uploadChallengeFile(challenge, file).then(() => {
    expect(uploadFile.mock.calls.length).toEqual(1);
    expect(getFiles.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.setChallengeFiles(challenge.id, files)]);
  }).then(() => { });
});

it("uploadChallengeFile", async () => {
  var deleteFile = jest.fn(() => Promise.resolve());
  api.deleteFile = deleteFile;
  var getFiles = jest.fn(() => Promise.resolve(files));
  api.getFiles = getFiles;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(4);
  return service.deleteChallengeFile(challenge, files[0]).then(() => {
    expect(deleteFile.mock.calls.length).toEqual(1);
    expect(getFiles.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.setChallengeFiles(challenge.id, files)]);
  }).then(() => { });
});