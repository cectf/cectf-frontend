import { StateManager } from "state";

export interface CsrfState {
  csrf_token: string;
}

export class CsrfStateManager extends StateManager<CsrfState> {
  constructor() {
    super({ csrf_token: "" });
  }
}
