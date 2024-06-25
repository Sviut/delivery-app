import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, User } from '@prisma/client'
import { returnUserObject } from './return-user.object'
import { returnProductObject } from '../product/returnProductObject.object'

@Injectable()
export class UserService {
	constructor(private prismaService: PrismaService) {}

	async getById(id: string, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			},
			select: {
				...returnUserObject,
				favorites: {
					select: {
						...returnProductObject
					}
				},
				...selectObject
			}
		})

		if (!user) throw new NotFoundException('User does not exist')

		return user
	}

	async toggleFavorite(userId: string, productId: string) {
		const user = await this.getById(userId)

		if (!user) throw new UnauthorizedException('User does not exist')

		const isExists = user.favorites.some(product => product.id === productId)

		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				favorites: {
					[isExists ? 'disconnect' : 'connect']: {
						id: productId
					}
				}
			}
		})

		return { message: 'Success' }
	}
}
