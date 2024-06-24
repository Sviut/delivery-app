import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { PrismaService } from '../prisma.service'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
	constructor(
		private prismaService: PrismaService,
		private jwtService: JwtService
	) {}

	async login(authDto: AuthDto) {
		const user = await this.validateUser(authDto)

		return this.returnUserPayload(user)
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwtService.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid refresh token')

		const user = await this.prismaService.user.findUnique({
			where: { id: result.id }
		})

		return this.returnUserPayload(user)
	}

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

		return this.returnUserPayload(newUser)
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

	private async returnUserPayload(user: User) {
		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async validateUser(authDto: AuthDto) {
		const user = await this.prismaService.user.findUnique({
			where: { email: authDto.email }
		})

		if (!user) throw new UnauthorizedException('User does not exist')

		const isValid = await verify(user.password, authDto.password)

		if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}
}
