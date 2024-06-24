import { BadRequestException, Injectable } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { PrismaService } from '../prisma.service'
import { faker } from '@faker-js/faker'
import { hash } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
	constructor(
		private prismaService: PrismaService,
		private jwtService: JwtService
	) {}

	async register(authDto: AuthDto) {
		const oldUser = await this.prismaService.user.findUnique({
			where: { email: authDto.email }
		})

		if (oldUser) throw new BadRequestException('User already exists')

		const newUser = await this.prismaService.user.create({
			data: {
				email: authDto.email,
				name: faker.person.firstName(),
				avatarPath: faker.image.avatar(),
				phone: faker.phone.number(),
				password: await hash(authDto.password)
			}
		})

		const tokens = await this.issueTokens(newUser.id)

		return {
			user: this.returnUserFields(newUser),
			...tokens
		}
	}

	private async issueTokens(userId: string) {
		const data = { id: userId }

		const accessToken = this.jwtService.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwtService.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private returnUserFields({ id, email }: User) {
		return { id, email }
	}
}
