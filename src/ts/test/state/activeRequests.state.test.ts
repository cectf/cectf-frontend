
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";

var url1 = "/api/a";
var url2 = "/api/b";
var url3 = "/api/c";

afterEach(() => {
    store.dispatch(actions.reset());
});

it("start request", () => {
    expect(store.getState().activeRequests).toEqual([]);
    store.dispatch(actions.startRequest(url1));
    expect(store.getState().activeRequests).toEqual([url1]);
});

it("start multiple requests", () => {
    expect(store.getState().activeRequests).toEqual([]);
    store.dispatch(actions.startRequest(url1));
    store.dispatch(actions.startRequest(url2));
    store.dispatch(actions.startRequest(url3));
    expect(store.getState().activeRequests).toEqual([url1, url2, url3]);
});

it("finish request", () => {
    expect(store.getState().activeRequests).toEqual([]);
    store.dispatch(actions.startRequest(url1));
    expect(store.getState().activeRequests).toEqual([url1]);
    store.dispatch(actions.finishRequest(url1));
    expect(store.getState().activeRequests).toEqual([]);
});

it("finish async requests", () => {
    expect(store.getState().activeRequests).toEqual([]);
    store.dispatch(actions.startRequest(url1));
    store.dispatch(actions.startRequest(url2));
    store.dispatch(actions.startRequest(url3));
    expect(store.getState().activeRequests).toEqual([url1, url2, url3]);
    store.dispatch(actions.finishRequest(url2));
    expect(store.getState().activeRequests).toEqual([url1, url3]);
});

it("finish request without starting", () => {
    expect(store.getState().activeRequests).toEqual([]);
    store.dispatch(actions.startRequest(url1));
    expect(store.getState().activeRequests).toEqual([url1]);
    store.dispatch(actions.finishRequest(url2));
    expect(store.getState().activeRequests).toEqual([url1]);
});