import BaseException from '@common/exceptions/BaseException';

class AuthException extends BaseException {
  constructor(status = 403, message = 'Unauthorized') {
    super(status, message);
  }
}

export default AuthException;