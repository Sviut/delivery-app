import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/auth/decorators/user.decorator'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getById(id)
	}

	@HttpCode(HttpStatus.OK)
	@Auth()
	@Patch('profile/favorites/:productId')
	async toggleFavorite(
		@CurrentUser('id') id: string,
		@Param('productId') productId: string
	) {
		return this.userService.toggleFavorite(id, productId)
	}
}
