import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { Category } from '@prisma/client'
import { CategoryDto } from './dto/category.dto'
import { Auth } from '../auth/auth/decorators/auth.decorator'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll(): Promise<Category[]> {
		return this.categoryService.getAll()
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string): Promise<Category> {
		return this.categoryService.getById(id)
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string): Promise<Category> {
		return this.categoryService.getBySlug(slug)
	}

	@HttpCode(HttpStatus.OK)
	@Auth()
	@Post()
	async create() {
		return this.categoryService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(id, dto)
	}

	@HttpCode(HttpStatus.OK)
	@Auth()
	@Post()
	async delete(@Param('id') id: string) {
		return this.categoryService.delete(id)
	}
}
