import { TestBed } from '@angular/core/testing';
import {RpcMessageService} from '@services/communication/rpc-message.service';
import {LoggingService} from '@services/logging/logging.service';
import {WebsocketService} from '@services/communication/websocket.service';
import {Subject, take} from 'rxjs';
import {RpcResponse} from '@interfaces/communication/rpc-response.interface';


describe('RpcMessageService', () => {
  let mockLoggingService: jasmine.SpyObj<LoggingService>;
  let mockWebsocketService: jasmine.SpyObj<WebsocketService>;
  let mockMessage$: Subject<any>;
  let service: RpcMessageService;

  const validMessage: RpcResponse = { jsonrpc: '2.0', id: 'abc123', result: { foo: 'bar' } };
  const invalidMessage = "some junk { wrong: 'shape' }";

  beforeEach(() => {
    mockLoggingService = jasmine.createSpyObj('LoggingService', ['info', 'error']);
    mockWebsocketService = jasmine.createSpyObj('WebsocketService', ['onMessage']);
    mockMessage$ = new Subject();
    mockWebsocketService.onMessage.and.returnValue(mockMessage$.asObservable());


    TestBed.configureTestingModule({
      providers: [
        { provide: LoggingService, useValue: mockLoggingService },
        { provide: WebsocketService, useValue: mockWebsocketService }
      ]
    });

    service = TestBed.inject(RpcMessageService);
  });

  it('should emit parsed message and log when schema is valid', (done) => {
    service.rpcMessage$.pipe(take(1)).subscribe(parsed => {
      expect(parsed).toEqual(validMessage);
      expect(mockLoggingService.info).toHaveBeenCalledWith(
        'Received message',
        jasmine.any(Number),
        jasmine.objectContaining({ parsedMessage: validMessage })
      );
      done();
    });

    mockMessage$.next(validMessage);
  });

  it('should log error but not emit if schema is invalid', () => {
    const spy = jasmine.createSpy('rpcEmitSpy');
    service.rpcMessage$.subscribe(spy);

    mockMessage$.next(invalidMessage);

    expect(mockLoggingService.info).not.toHaveBeenCalled();
    expect(mockLoggingService.error).toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });
});
