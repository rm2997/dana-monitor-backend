export class SocketMessageStatus {
  Code: string;
  Message: string;
  constructor(code: string, message: string) {
    this.Code = code;
    this.Message = message;
  }

  public static ok = new SocketMessageStatus('0', 'ok');
  public static error = new SocketMessageStatus('1', 'Error');
  public static InvalidMessage = new SocketMessageStatus(
    '2',
    'Invalid message format',
  );
  public static InvalidCommand = new SocketMessageStatus(
    '3',
    'Command not found',
  );
  public static InvalidArguments = new SocketMessageStatus(
    '4',
    'Invalid arguments',
  );
  public static InternalError = new SocketMessageStatus(
    '5',
    'Internal error occured',
  );
}
