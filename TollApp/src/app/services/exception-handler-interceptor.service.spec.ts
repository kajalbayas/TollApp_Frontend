import { TestBed } from '@angular/core/testing';

import { ExceptionHandlerInterceptorService } from './exception-handler-interceptor.service';

describe('ExceptionHandlerInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExceptionHandlerInterceptorService = TestBed.get(ExceptionHandlerInterceptorService);
    expect(service).toBeTruthy();
  });
});
