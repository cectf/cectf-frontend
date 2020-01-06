
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";
import { FileDescriptor } from "@cectf/types";


afterEach(() => {
    store.dispatch(actions.reset());
});

const challengeId = 7;
const files: FileDescriptor[] = [{ name: "name", url: "url" }];

it("set challenge files", () => {
    expect(store.getState().files.size).toEqual(0);
    store.dispatch(actions.setChallengeFiles(challengeId, files));
    expect(store.getState().files.size).toEqual(1);
    expect(store.getState().files.get(challengeId)).toEqual(files);
});
