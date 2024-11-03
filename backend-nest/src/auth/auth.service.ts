import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    if (!email) {
      throw new Error('Email is required');
    }

    if (!password) {
      throw new Error('Password is required');
    }

    const saltOrRounds = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = this.authRepository.create({
      email: email,
      password: hashedPassword,
    });

    return await this.authRepository.save(newUser);
  }

  async validateUser(email: string, password: string) {
    const user = await this.authRepository.findOne({ where: { email: email } });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Password incorrect');
    }
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getProfile(userId: number) {
    const user = await this.authRepository.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    // Omit sensitive data if needed
    delete user.password;

    return user;
  }
}
