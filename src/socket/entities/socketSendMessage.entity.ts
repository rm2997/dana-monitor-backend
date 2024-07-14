export class SocketSendMessage {
  Cmd: string;
  Args?: Map<string, object>;
  HasArguments: boolean;

  constructor(cmd: string, args: Map<string, object>, hasArguments: boolean) {
    this.Cmd = cmd;
    this.Args = args ? args : null;
    this.HasArguments = hasArguments;
  }
}
