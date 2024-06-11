import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { EncryptService } from './middleware/encrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}
  async signIn(
    email: string,
    password: string,
  ): Promise<{ name: string; email: string; access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    } else {
      if (!this.encryptService.comparePasswords(password, user.password)) {
        throw new UnauthorizedException();
      }
      const payload = { name: user.name, email: user.email };
      return {
        name: user.name,
        email: user.email,
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
