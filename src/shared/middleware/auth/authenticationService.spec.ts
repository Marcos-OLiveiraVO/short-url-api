import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authenticationService';
import { authDataMock } from './mockData/authMock';

let authenticationService: AuthenticationService;
describe('Authentication Service', () => {
  beforeEach(() => {
    const jwtService = new JwtService();
    authenticationService = new AuthenticationService(jwtService);
  });

  it('should be able to create a token', async () => {
    const token = await authenticationService.execute(authDataMock);

    expect(token).toMatchObject({
      access_token: expect.any(String),
    });
  });

  it('should be able to create and decoded token', async () => {
    const jwt = new JwtService();

    const token = await authenticationService.execute(authDataMock);
    const decoded = jwt.decode(token.access_token);

    expect(decoded).toMatchObject({
      sub: authDataMock.email,
    });
  });
});
